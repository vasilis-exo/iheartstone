// rxjs/Observable
import { Observable } from 'rxjs';

// rxjs/operators
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

// Environment
import { environment } from '../../../environments/environment';

// ngx-logger
import { NGXLogger } from 'ngx-logger';

// Services
import { ApiHelperService } from '../shared/api-helper.service';
import { HttpClient } from '@angular/common/http';

// Models
import { CardDeck } from '../../models/card/card.model';


@Injectable()
export class CardService {

  private static _ENDPOINTS = environment.api.endpoints;

  constructor(
    private _http: HttpClient,
    private _apihelperService: ApiHelperService,
    private logger: NGXLogger
  ) { }

  public getAllCardsDecks$(payload?: any): Observable<CardDeck[]> {

    return this._get_endpoint(CardService._ENDPOINTS.info, payload);
  }

  private _get_endpoint(endpoint: string, payload?: any): Observable<CardDeck[]> {
    return this._http
            .get(
              this._apihelperService.getUrl(endpoint),
              this._apihelperService.createRequestOptionsEmpty()
            )
            .pipe(
              map( (res: any) => {
                const extractedData = this._apihelperService.handleResponse(res, 'get');
                return this._construct_models(extractedData, endpoint);
              }),
              catchError(this._apihelperService.handleError)
            );
  }

  private _construct_models(extracted_data: any, endpoint: string): CardDeck[] {
    this.logger.info('[ _construct_models ]');

    this.logger.log('getAllCardsDecks data stored successfully.');
    return this._construct_cardDeck_model(extracted_data);
  }

  private _construct_cardDeck_model(extracted_data): CardDeck[] {
    this.logger.info('[ _construct_cardDeck_model ]');
    return <CardDeck[]> extracted_data;
  }

}
