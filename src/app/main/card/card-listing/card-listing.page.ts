import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Model
import { Card } from './../../../models/card/card.model';

// Services
import { LoaderService } from '../../../services/shared/loader.service';
import { ToastService } from './../../../services/shared/toast.service';
import { CardService } from '../../../services/card/card.service';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  public cardDeckGroup: string;
  public cardDeck: string;
  public cards: Card[] = [];
  public copyOfCards: Card[] = [];
  public refresher: boolean;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} _route
   * @param {CardService} _cardService
   * @param {LoaderService} _loaderService
   * @param {ToastService} _toastService
   */
  constructor(
    private _route: ActivatedRoute,
    private _cardService: CardService,
    private _loaderService: LoaderService,
    private _toastService: ToastService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  async ionViewWillEnter() {
    this.cardDeckGroup = this._route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this._route.snapshot.paramMap.get('cardDeck');
    this.refresher = false;

    if ( this.cards && this.cards.length === 0) {
      // Call _get_cards()
      this._get_cards(this.refresher);
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private _get_cards(refresher: boolean, event?: any) {

    // Show Loader
    if (!refresher) {
      this._loaderService.presentLoading();
    }

    this._cardService.getCardsByDeck$(this.cardDeckGroup, this.cardDeck)
      .subscribe((data) => {
        this.cards = data;
        this.copyOfCards = Array.from(this.cards);
        // Dismiss Loader
        if (!refresher) {
          this._loaderService.dismissLoading();
        } else {
          event.target.complete();
        }
      },
      (errorData: any) => {
        // Show Error Message
        const errorMessage = 'Oops! Something went wrong. Try to refresh page';
        this._toastService.presentErrorToast(errorMessage);

        // Dismiss Loader
        if (!refresher) {
          this._loaderService.dismissLoading();
        } else {
          event.target.complete();
        }
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Functions
  // -----------------------------------------------------------------------------------------------------
  public generateUrl(cardId: string): string {
    return `/tabs/(card:card/${cardId})`;
  }

  public doRefresh(event) {
    this.refresher = true;
    this._get_cards(this.refresher, event);
    // event.target.complete();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 5000);
  }

  public handleSearchCompletedEvent(cards: Card[]) {
    this.cards = cards;
  }

}
