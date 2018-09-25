import { Component, ViewChild } from '@angular/core';

import { FavoriteCardStore } from './../../../services/storage/card-favorite.store';

// @angular/animations
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  keyframes
} from '@angular/animations';

// Rxjs
import { Subscription } from 'rxjs';

// Models
import { Card } from './../../../models/card/card.model';


import { objectPropsToArray } from '../../../utils/json-parse.util';

@Component({
  selector: 'app-card-favorite',
  templateUrl: './card-favorite.page.html',
  styleUrls: ['./card-favorite.page.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('150ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
        ]), { optional: true }),

        query(':leave', stagger('100ms', [
          animate('0.5s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 1 })
          ]))
        ]), { optional: true })

      ])
    ])
  ]
})
export class CardFavoritePage {

  public favoriteCardSub: Subscription;
  public favoriteCardList: Card[];
  // ViewChild Elements
  @ViewChild('itemSliding') itemSlidingEl;

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

  public removeFavoriteCard(favoriteCard: Card, event: Event) {
    event.stopPropagation();
    this._favoriteCardStore.toggleCard(favoriteCard);
    this.itemSlidingEl.closeOpened();
  }

}
