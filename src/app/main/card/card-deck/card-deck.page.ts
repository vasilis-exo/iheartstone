import { Component } from '@angular/core';

// Services
import { CardService } from '../../../services/card/card.service';
import { LoaderService } from '../../../services/shared/loader.service';
import { ToastService } from '../../../services/shared/toast.service';

// Models
import { CardDeck } from '../../../models/card/card.model';

// jquery
import * as $ from 'jquery';

// ngx-logger
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.page.html',
  styleUrls: ['./card-deck.page.scss'],
})
export class CardDeckPage {

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
    private _cardService: CardService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _logger: NGXLogger
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ionViewWillEnter() {
    this.getCardDecks();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private async getCardDecks() {

    await this._loaderService.presentLoading();

    this._cardService.getAllCardsDecks$()
      .subscribe((data: CardDeck[]) => {
        this.extraAllowedDecks(data);
        // Dismiss Loader
        this._loaderService.dismissLoading();
      },
      (errorData: any) => {
        // Show Error Message
        this._logger.log(errorData);
        const errorMessage = 'Oops! Something went wrong. Try to refresh page';
        this._toastService.presentErrorToast(errorMessage);

        // Dismiss Loader
        this._loaderService.dismissLoading();
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
