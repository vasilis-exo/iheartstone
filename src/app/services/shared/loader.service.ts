import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  private _loader: HTMLIonLoadingElement;

  /**
   * Constructor
   *
   * @param {LoadingController} _LoadingCtrl
   */
  constructor(
    private _LoadingCtrl: LoadingController
  ) { }


  public async presentLoading(): Promise<HTMLIonLoadingElement> {
    this._loader = await this._LoadingCtrl.create({
      message: 'Loading',
      translucent: true
    });
    this._loader.present();

    return this._loader;
  }

  public dismissLoading() {
    if (this._loader) {
      this._loader.dismiss();
    }
  }

}
