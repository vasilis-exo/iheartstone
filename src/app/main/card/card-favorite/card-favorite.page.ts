import { Component } from '@angular/core';

import { FavoriteCardStore } from './../../../services/storage/card-favorite.store';

// Rxjs
import { Subscription } from 'rxjs';

// Models
import { Card } from './../../../models/card/card.model';


import { objectPropsToArray } from '../../../utils/json-parse.util';

@Component({
  selector: 'app-card-favorite',
  templateUrl: './card-favorite.page.html',
  styleUrls: ['./card-favorite.page.scss'],
})
export class CardFavoritePage {

  public favoriteCardSub: Subscription;
  public favoriteCardList: Card[];

  /**
   * Constructor
   *
   * @param {FavoriteCardStore} _favoriteCardStore
   */
  constructor(
    private _favoriteCardStore: FavoriteCardStore
  ) {
    this._get_storage_favoriteCards();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ionViewDidLeave() {
    if (this.favoriteCardSub && !this.favoriteCardSub.closed) {
      this.favoriteCardSub.unsubscribe();
    }
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private _get_storage_favoriteCards() {
    this.favoriteCardSub = this._favoriteCardStore.getFavoriteCards()
      .subscribe((favoriteCards: any) => {
        this.favoriteCardList = objectPropsToArray(favoriteCards);
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Functions
  // -----------------------------------------------------------------------------------------------------
  public generateUrl(cardId: string): string {
    return `/tabs/(card:card/${cardId})`;
  }
}
