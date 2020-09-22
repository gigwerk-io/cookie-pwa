import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {Response} from '../../../interfaces/responses/Response';
import {Login, ValidToken} from '../../../interfaces/responses/Auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {remove, set} from '../../internal/storage';
import {StorageKeys} from '../../../interfaces/enum/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public restService: RestService,
    public httpClient: HttpClient
  ) {  }

  public businessAppLogin(
    loginData: { username: string, password: string }
  ): Promise<Response<Login>> {
    return this.httpClient.post<Response<Login>>(`${environment.apiUrl}/login`, loginData, {})
    .toPromise()
    .then(async res => {
      await set(StorageKeys.ACCESS_TOKEN, res.data.token);
      await set(StorageKeys.USER, res.data.user);
      return res;
    });
  }

  public endSession(): Promise<Response<string>> {
    return this.restService.makeHttpRequest<Response<string>>(`logout`, 'POST', {}, true)
      .then(httpRes => httpRes.toPromise()
        .then(async res => {
          if (res.success) { // remove all storage constants
            for (let key in StorageKeys) {
              await remove(key);
            }
          }
          return res;
        }));
  }

  public validateBusinessToken(): Promise<Response<ValidToken>> {
    return this.restService.makeHttpRequest<Response<ValidToken>>(`validate`, 'GET', {}, true)
    .then(httpRes => httpRes.toPromise()
      .then(res => {
        if (!res.data.validToken) {
          // logout
          console.log('logout');
        }

        return res;
      })
    );
  }
}
