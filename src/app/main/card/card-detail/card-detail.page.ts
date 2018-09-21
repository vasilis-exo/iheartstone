
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { Platform } from '@ionic/angular';
=======
import { Platform, NavController } from '@ionic/angular';
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e

// Models
import { Card } from './../../../models/card/card.model';

// Services
import { CardService } from './../../../services/card/card.service';
import { LoaderService } from '../../../services/shared/loader.service';
import { AlertService } from './../../../services/shared/alert.service';
import { ToastService } from '../../../services/shared/toast.service';
<<<<<<< HEAD

=======
import { Subscription } from 'rxjs';
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage {

  // Back Button
<<<<<<< HEAD
  @ViewChild('backButton') backButtonEl: ElementRef;

  private _cardId: string;
  public card: Card;
=======
  // @ViewChild('backButton', { read: ElementRef }) backButtonEl: ElementRef;

  private _cardId: string;
  public card: Card;
  public backBtn: Subscription;
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e

  /**
   * Constructor
   *
   * @param {Platform} _platform
   * @param {ActivatedRoute} _route
   * @param {CardService} _cardService
   * @param {LoaderService} _loaderService
   * @param {AlertService} _alertService
   * @param {ToastService} _toastService
<<<<<<< HEAD
=======
   * @param {NavController} _navCtrl
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
   */
  constructor(
    private _platform: Platform,
    private _route: ActivatedRoute,
    private _cardService: CardService,
    private _loaderService: LoaderService,
    private _alertService: AlertService,
    private _toastService: ToastService,
<<<<<<< HEAD
  ) { }
=======
    private _navCtrl: NavController
  ) {
   }
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e

  // -----------------------------------------------------------------------------------------------------
  // @ Ionic lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ionViewWillEnter() {
<<<<<<< HEAD
=======
    // Subscribe BackBtn
    this.register_back_button();

>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
    this._cardId = this._route.snapshot.paramMap.get('cardId');

    if (!this.card) {
      // Call _get_cards()
      this._get_card();
    }
<<<<<<< HEAD

    // Register Back Button
   this.register_back_button();
=======
  }

  ionViewDidLeave() {
    // Unsubscribe BackBtn
    this._unregister_back_button();
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
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
  private _get_card() {
    // Show Loader
    this._loaderService.presentLoading();

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
<<<<<<< HEAD
    this._platform.backButton.subscribe(() => {
      this.backButtonEl.nativeElement.click();
    });
  }

=======
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

>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
}
