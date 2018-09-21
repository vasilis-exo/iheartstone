import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

<<<<<<< HEAD
=======
import { FcmService } from './services/shared/fcm.service';
import { ToastService } from './services/shared/toast.service';
import { NGXLogger } from 'ngx-logger';

>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
<<<<<<< HEAD
    private statusBar: StatusBar
=======
    private statusBar: StatusBar,
    private _fcmService: FcmService,
    private _toaster: ToastService,
    private _logger: NGXLogger
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
<<<<<<< HEAD
=======
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
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
    });
  }
}
