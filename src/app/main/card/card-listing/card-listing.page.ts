import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Model
import { Card } from './../../../models/card/card.model';

// Services
import { LoaderService } from '../../../services/shared/loader.service';
import { ToastService } from './../../../services/shared/toast.service';
import { CardService } from '../../../services/card/card.service';
import { FavoriteCardStore } from './../../../services/storage/card-favorite.store';

// Rxjs
import { Subscription } from 'rxjs';


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
  public isLoading = false;
  public favoriteCards: any = {};
  public favoriteCardSub: Subscription;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} _route
   * @param {CardService} _cardService
   * @param {LoaderService} _loaderService
   * @param {ToastService} _toastService
   * @param {FavoriteCardStore} _favoriteCardStore
   */
  constructor(
    private _route: ActivatedRoute,
    private _cardService: CardService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _favoriteCardStore: FavoriteCardStore
  ) {
    this._get_storage_favoriteCards();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ionViewWillEnter() {
    this.cardDeckGroup = this._route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this._route.snapshot.paramMap.get('cardDeck');
    this.refresher = false;

    if (this.cards && this.cards.length === 0) {
      // Call _get_cards()
      this._get_cards(this.refresher);
    }
  }

  ionViewDidLeave() {
    if (this.favoriteCardSub && !this.favoriteCardSub.closed) {
      this.favoriteCardSub.unsubscribe();
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

        // Check if card is favorite
        this.cards.map((card: Card) => {
          card.favorite = this._isCardFavorite(card.cardId);
        });

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

  private _get_storage_favoriteCards() {
    this.favoriteCardSub = this._favoriteCardStore.getFavoriteCards()
      .subscribe((favoriteCards: any) => {
        this.favoriteCards = favoriteCards;
      });
  }

  private _isCardFavorite(cardId: string): boolean {
    const card = this.favoriteCards[cardId];
    return (card ? true : false);
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
    this.isLoading = false;
  }

  public handleSearchStartedEvent() {
    this.isLoading = true;
  }

  public favoriteCard(card: Card) {
    this._favoriteCardStore.toggleCard(card);
  }

}
