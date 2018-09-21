import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// @angular/common/http
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';

// Interceptors
import { AppHttpInterceptor } from './interceptors/app.http-interceptor';

// Components
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

// Services
import { ApiHelperService } from './services/shared/helpers/api-helper.service';
import { LoaderService } from './services/shared/loader.service';
import { ToastService } from './services/shared/toast.service';
import { AlertService } from './services/shared/alert.service';

// ngx-logger
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// Environments
import { environment } from '../environments/environment';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FirebaseConfig } from './config/firebase.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      level: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.DEBUG,
      serverLogLevel: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.ERROR
    }),
    // Firebase Modules
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    ApiHelperService,
    LoaderService,
    ToastService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    Firebase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
