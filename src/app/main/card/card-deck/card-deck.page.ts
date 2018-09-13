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

  public cardDecks: CardDeck[] = [];

  constructor(
    private _cardService: CardService
  ) { }

  ngOnInit() {
    this._cardService.getAllCardsDecks$()
      .subscribe( (data: CardDeck[]) => {
        this.cardDecks = data;
      });
  }

}
