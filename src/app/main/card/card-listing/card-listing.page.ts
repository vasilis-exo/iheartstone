import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

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
  public backBtn: Subscription;
  public limit = 20;

  /**
   * Constructor
   * @param {Platform} _platform
   * @param {ActivatedRoute} _route
   * @param {CardService} _cardService
   * @param {LoaderService} _loaderService
   * @param {ToastService} _toastService
   * @param {FavoriteCardStore} _favoriteCardStore
   * @param {Location} _location
   */
  constructor(
    private _platform: Platform,
    private _route: ActivatedRoute,
    private _cardService: CardService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _favoriteCardStore: FavoriteCardStore,
    private _navCtrl: NavController
  ) {
    this._get_storage_favoriteCards();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ionViewWillEnter() {
    // Subscribe BackBtn
    this.register_back_button();

    this.cardDeckGroup = this._route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this._route.snapshot.paramMap.get('cardDeck');
    this.refresher = false;

    if (this.cards && this.cards.length === 0) {
      // Call _get_cards()
      this._get_cards(this.refresher);
    }
  }

  ionViewDidLeave() {
    // Unsubscribe BackBtn
    this._unregister_back_button();

    if (this.favoriteCardSub && !this.favoriteCardSub.closed) {
      this.favoriteCardSub.unsubscribe();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private async _get_cards(refresher: boolean, event?: any) {

    // Show Loader
    if (!refresher) {
      await this._loaderService.presentLoading();
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

  private register_back_button() {
    this.backBtn = this._platform.backButton.subscribe(() => {
      // this._location.back();
      this._navCtrl.goBack();
    });
  }

  private _unregister_back_button() {
    if (this.backBtn && !this.backBtn.closed) {
      this.backBtn.unsubscribe();
    }
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
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   event.target.complete();
    // }, 1000);
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

  public loadData(infiniteScroll) {
    setTimeout( () => {
      this.limit += 20;
      infiniteScroll.target.complete();
    }, 200);
  }

}
