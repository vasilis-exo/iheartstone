import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {


  /**
   * Constructor
   *
   * @param {ToastController} _ToastCtrl
   */
  constructor(
    private _ToastCtrl: ToastController
  ) { }


  public async presentToast(message: string) {
    const toast = await this._ToastCtrl.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  public async presentErrorToast(message: string) {
    const toast = await this._ToastCtrl.create({
      message,
      position: 'top',
      duration: 3000,
      cssClass: 'toast-error'
    });
    toast.present();
  }


}
