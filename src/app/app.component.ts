import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './services/shared/fcm.service';
import { ToastService } from './services/shared/toast.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _fcmService: FcmService,
    private _toaster: ToastService,
    private _logger: NGXLogger
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._notificationSetup();
    });
  }

  private _notificationSetup() {
    this._logger.info('_notificationSetup');

    // Get Token
    this._fcmService.getToken();

    // Push Notification
    this._fcmService.onNotifications().subscribe((msg) => {
      // ios hotfix
      if ( this.platform.is('ios') ) {
        this._toaster.presentToast(msg.aps.alert);
      } else {
        this._toaster.presentToast(msg.body);
      }
    });
  }
}
