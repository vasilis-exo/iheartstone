import { Injectable } from '@angular/core';

// rxjs/Observable
import { BehaviorSubject, Observable } from 'rxjs';

// Ionic Storage
import { Storage } from '@ionic/storage';

// ngx-logger
import { NGXLogger } from 'ngx-logger';

// Models
import { Card } from '../../models/card/card.model';


@Injectable()
export class FavoriteCardStore {

  private _favoriteCardsSubject = new BehaviorSubject({});

  /**
   * Constructor
   *
   * @param {Storage} _storage
   * @param {NGXLogger} _logger
   */
  constructor(
    private _storage: Storage,
    private _logger: NGXLogger
  ) {
    this._loadInitData();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private _loadInitData() {
    this._logger.info('_loadInitData');

    this._storage.get('favoriteCards').then((favoriteCards) => {
      this._favoriteCardsSubject.next(favoriteCards || {});
      this._logger.log(this._favoriteCardsSubject.getValue());
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Functions
  // -----------------------------------------------------------------------------------------------------
  public getFavoriteCards(): Observable<any> {
    return this._favoriteCardsSubject.asObservable();
  }

  public toggleCard(card: Card) {
    // Get favoriteCards from Storage
    const favoriteCards = this._favoriteCardsSubject.getValue();

    if (card.favorite) {
      card.favorite = false;
      delete favoriteCards[card.cardId];
    } else {
      card.favorite = true;
      favoriteCards[card.cardId] = card;
    }

    this._storage.set('favoriteCards', favoriteCards).then(() => {
      this._favoriteCardsSubject.next(favoriteCards);
    });
  }


}
