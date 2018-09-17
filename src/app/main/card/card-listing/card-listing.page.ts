import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../services/card/card.service';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  public cardDeckGroup: string;
  public cardDeck: string;
  public cards: any[] = [];

  /**
   * Constructor
   *
   * @param {ActivatedRoute} _route
   * @param {CardService} _cardService
   */
  constructor(
    private _route: ActivatedRoute,
    private _cardService: CardService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ionViewWillEnter() {
   this.cardDeckGroup = this._route.snapshot.paramMap.get('cardDeckGroup');
   this.cardDeck = this._route.snapshot.paramMap.get('cardDeck');

   this._cardService.getCardsByDeck$(this.cardDeckGroup, this.cardDeck)
                        .subscribe( (data) => {
                          this.cards = data;
                        });
  }

}
