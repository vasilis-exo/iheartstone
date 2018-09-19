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


  public async presentToast() {
    const toast = await this._ToastCtrl.create({
      message: 'Your settings have been saved',
      duration: 2000
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
