import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FcmService {


  /**
   * Constructor
   *
   * @param {Firebase} _firebase
   * @param {AngularFirestore} _firestore
   * @param {Platform} _platform
   */
  constructor(
    private _firebase: Firebase,
    private _firestore: AngularFirestore,
    private _platform: Platform
  ) { }

  public async getToken() {
    let token;

    if (this._platform.is('android')) {
      token = await this._firebase.getToken();
    }

    if (this._platform.is('ios')) {
      token = await this._firebase.getToken();
      await this._firebase.grantPermission();
    }

    this._save_token(token);
  }

  public onNotifications() {
    return this._firebase.onNotificationOpen();
  }

  private _save_token(token) {
    if (!token) { return; }

    const devicesRef = this._firestore.collection('devices');

    const data = {
      token: token,
      userId: 'testUserId'
    };

    return devicesRef.doc(token).set(data);
  }

}
