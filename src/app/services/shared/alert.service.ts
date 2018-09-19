import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertService {


  /**
   * Constructor
   *
   * @param {AlertController} _alertCtrl
   */
  constructor(
    private _alertCtrl: AlertController
  ) { }


  public async presentAlert(message: string) {
    const alert = await this._alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
