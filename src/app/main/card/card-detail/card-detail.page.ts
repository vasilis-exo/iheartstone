
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

// Models
import { Card } from './../../../models/card/card.model';

// Services
import { CardService } from './../../../services/card/card.service';
import { LoaderService } from '../../../services/shared/loader.service';
import { AlertService } from './../../../services/shared/alert.service';
import { ToastService } from '../../../services/shared/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage {

  // Back Button
  // @ViewChild('backButton', { read: ElementRef }) backButtonEl: ElementRef;

  private _cardId: string;
  public card: Card;
  public backBtn: Subscription;

  /**
   * Constructor
   *
   * @param {Platform} _platform
   * @param {ActivatedRoute} _route
   * @param {CardService} _cardService
   * @param {LoaderService} _loaderService
   * @param {AlertService} _alertService
   * @param {ToastService} _toastService
   * @param {NavController} _navCtrl
   */
  constructor(
    private _platform: Platform,
    private _route: ActivatedRoute,
    private _cardService: CardService,
    private _loaderService: LoaderService,
    private _alertService: AlertService,
    private _toastService: ToastService,
    private _navCtrl: NavController
  ) {
   }

  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ionViewWillEnter() {
    // Subscribe BackBtn
    this.register_back_button();

    this._cardId = this._route.snapshot.paramMap.get('cardId');

    if (!this.card) {
      // Call _get_cards()
      this._get_card();
    }
  }

  ionViewDidLeave() {
    // Unsubscribe BackBtn
    this._unregister_back_button();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Functions
  // -----------------------------------------------------------------------------------------------------
  public setDefaultImage($event) {
    this.card.img = 'assets/images/DefaultCard.png';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Functions
  // -----------------------------------------------------------------------------------------------------
  private async _get_card() {
    // Show Loader
    await this._loaderService.presentLoading();

    this._cardService.getCardsById$(this._cardId)
      .subscribe((data) => {
        this.card = data;
        // this._alertService.presentAlert('Error');
        // Dismiss Loader
        this._loaderService.dismissLoading();
      },
      (errorData: any) => {
        // Show Error Message
        const errorMessage = 'Oops! Something went wrong. Try to refresh page';
        this._toastService.presentErrorToast(errorMessage);

        // Dismiss Loader
        this._loaderService.dismissLoading();
      });
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

}
