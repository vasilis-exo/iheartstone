

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs/Observable
import { Observable } from 'rxjs';

// rxjs/operators
import { catchError, map } from 'rxjs/operators';

// Environment
import { environment } from '../../../environments/environment';

// ngx-logger
import { NGXLogger } from 'ngx-logger';

// Services
import { ApiHelperService } from '../shared/helpers/api-helper.service';

// Models
import { CardDeck } from '../../models/card/card.model';


@Injectable()
export class CardService {

  private static _ENDPOINTS = environment.api.endpoints;

  /**
   * Constructor
   *
   * @param {HttpClient} _http
   * @param {ApiHelperService} _apihelperService
   * @param {NGXLogger} _logger
   */
  constructor(
    private _http: HttpClient,
    private _apihelperService: ApiHelperService,
    private _logger: NGXLogger
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Functions
  // -----------------------------------------------------------------------------------------------------
  public getAllCardsDecks$(payload?: any): Observable<CardDeck[]> {
    return this._get_all_cards_decks_endpoint(CardService._ENDPOINTS.info, payload);
  }

  public getCardsByDeck$(cardDeckGroup: string, cardDeck: string, payload?: any): Observable<any> {
    return this._get_cards_by_deck_endpoint(`${CardService._ENDPOINTS.cards}/${cardDeckGroup}/${cardDeck}`, payload);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private _get_all_cards_decks_endpoint(endpoint: string, payload?: any): Observable<CardDeck[]> {
    return this._http
      .get(
        this._apihelperService.getUrl(endpoint),
        this._apihelperService.createRequestOptionsEmpty()
      )
      .pipe(
        map((res: any) => {
          const extractedData = this._apihelperService.handleResponse(res, 'get');
          return this._construct_info_model(extractedData);
        }),
        catchError(this._apihelperService.handleError)
      );
  }

  private _construct_info_model(extracted_data): CardDeck[] {
    this._logger.info('[ _construct_info_model ]');
    console.log(extracted_data);

    return <CardDeck[]>extracted_data;
  }

  private _get_cards_by_deck_endpoint(endpoint: string, payload?: any): Observable<any> {
    return this._http
      .get(
        this._apihelperService.getUrl(endpoint),
        this._apihelperService.createRequestOptionsEmpty()
      )
      .pipe(
        map((res: any) => {
          const extractedData = this._apihelperService.handleResponse(res, 'get');
          return this._construct_card_model(extractedData);
        }),
        catchError(this._apihelperService.handleError)
      );
  }

  private _construct_card_model(extracted_data): any {
    this._logger.info('[ _construct_card_model ]');
    console.log(extracted_data);

    return <CardDeck[]>extracted_data;
  }

}
