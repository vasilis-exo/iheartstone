import { Component, OnInit } from '@angular/core';

// Services
import { CardService } from '../../../services/card/card.service';

// Models
import { CardDeck } from '../../../models/card/card.model';

// jquery
import * as $ from 'jquery';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.page.html',
  styleUrls: ['./card-deck.page.scss'],
})
export class CardDeckPage implements OnInit {

  private readonly ALLOWED_DECKS = [
    'classes',
    'factions',
    'qualities',
    'types',
    'races'
  ];

  public cardDecks: CardDeck[] = [];


  /**
   * Constructor
   *
   * @param {CardService} _cardService
   */
  constructor(
    private _cardService: CardService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.getCardDecks();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private getCardDecks(): void {
    this._cardService.getAllCardsDecks$()
      .subscribe((data: CardDeck[]) => {
        this.extraAllowedDecks(data);
      });
  }

  private extraAllowedDecks(cardDecks: CardDeck[]) {
    this.ALLOWED_DECKS.forEach((deckName: string) => {
      this.cardDecks.push({
        name: deckName,
        types: cardDecks[deckName]
      });
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Functions
  // -----------------------------------------------------------------------------------------------------
  public generateUrl(cardDeckGroup: string, cardDeck: string): string {
    return `/tabs/(card:card/${cardDeckGroup}/${cardDeck})`;
  }

}
