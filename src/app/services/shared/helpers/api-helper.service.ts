// @angular/core
import { Injectable } from '@angular/core';

// @angular/common/http
import { HttpResponse, HttpHeaders, } from '@angular/common/http';

// rxjs/Observable
import { Observable } from 'rxjs';

// Environment
import { environment } from '../../../../environments/environment';

// // ngx-logger
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class ApiHelperService {

  constructor(
    private _logger: NGXLogger
  ) { }

  public getUrl(endpoint: string): string {
    this._logger.log(`[ getUrl ] => ${environment.api.url}/${endpoint}`);
    return `${environment.api.url}/${endpoint}`;
  }

  public createRequestOptionsEmpty(): any {
    return Object.assign(
      {},
      {},
      {},
      {
        observe: 'response' // 'body' as HttpObserve
      }
    );
  }

  public createRequestOptions(endpoint: string, payload: any): any {
    return Object.assign(
      {},
      // {
      //    headers: new HttpHeaders()
      //        .set('Content-Type', 'application/json; charset=utf-8')
      // },
      {
        params: payload
      },
      // {
      //   params: new HttpParams()
      //     .set('maxRecords', `${payload}`)
      // },
      {
        observe: 'response' // 'body' as HttpObserve
      }
    );
  }

  public handleResponse(res: Response, endpoint: string): any {
    this._logger.info('[ handleResponse ]');

    if (res) {
      this._logger.log('Response exists.');
      if (res instanceof HttpResponse) {
        // this._logger.log('Response is an \'HttpResponse\' instance.');
        if ($.inArray(res.status, [200]) >= 0) {
          this._logger.log(`Retrieved: ${res.status}`);
          return this._extract_response_data(res, endpoint);
        } else {
          this._logger.error(`Unknown status: ${res.status}`);
          return {};
        }
      } else {
        this._logger.error('Response is not an \'HttpResponse\' instance.');
        this.handleError(res);
      }
    } else {
      this._logger.error(`Response is empty: ${res.status}`);
      return {};
    }
  }

  private _extract_response_data(res: any, endpoint: string): any {
    this._logger.info('[ _extract_response_data ]');

    const json_extracted_data = res.body;

    if (json_extracted_data) {
      return json_extracted_data;
    }

    this._logger.log('Data cannot be extracted.');
    return {};
  }

  public handleError(error: Response): Observable<any> {
    this._logger.info('[ handleError ]');
    this._logger.error(error);
    return Observable.throw(error || 'An unknown error occurred.');
  }

}
