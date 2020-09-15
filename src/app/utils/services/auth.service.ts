import { Injectable } from '@angular/core';
import {RestService} from './rest.service';
import {Response} from '../interfaces/responses/Response';
import {ValidToken} from '../interfaces/responses/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public restService: RestService
  ) { }

  public isValidToken() {
    this.restService.makeHttpRequest<Response<ValidToken>>(`validate`, 'GET')
      .then(httpRes => httpRes.toPromise()
        .then(res => {
          if (!res.data.validToken) {
            // logout
          }

          return res;
        }));
  }
}
