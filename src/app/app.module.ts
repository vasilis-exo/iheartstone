import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Components
import { AppComponent } from './app.component';

// @angular/common/http
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Services
import { ApiHelperService } from './services/shared/api-helper.service';

// ngx-logger
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// Environment
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      level: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.DEBUG,
      serverLogLevel: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.ERROR
    })

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiHelperService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
