// '@angular/core
import { Injectable } from '@angular/core';

// @angular/common/http
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

// rxjs/Observable
import { Observable } from 'rxjs';

// Environment
import { environment } from '../../environments/environment';

// ngx-logger
import { NGXLogger } from 'ngx-logger';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private logger: NGXLogger
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.info('[ intercept ]');
    // this.logger.log('Setting the \'Content-Type\' header.');

    if (!req.headers.has('Content-Type')) {
      // this.logger.log('\'Content-Type\' header has not been set yet. So it will set to \'application/json\'.');

      // set request headers
      req = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('X-Mashape-Key', `${environment.api.key}`)
      });

    } else {
      // this.logger.log('\'Content-Type\' header has already been set. So the \'Accept\' header will set to \'application/json\'.');

      // set request headers
      req = req.clone({
        headers: req.headers
          .set('Accept', 'application/json')
          .set('X-Mashape-Key', `${environment.api.key}`)
      });

    }

    return next.handle(req);
  }

}
