import { Injectable } from '@angular/core';
import {get} from '../internal/storage';
import {StorageKeys} from '../../interfaces/enum/Constants';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    public http: HttpClient
  ) { }

  public makeHttpRequest<T>(
    route: string,
    httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    httpParams?: any,
    isRoot: boolean = false
  ): Promise<Observable<T> | undefined> {
    return get(StorageKeys.AccessToken)
    .then(token => {
      const header = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      };

      route = `${isRoot ? environment.apiRootUrl : environment.apiUrl}/${route}`;
      switch (httpMethod) {
        case 'GET':
          if (httpParams) {
            header['params'] = httpParams;
          }
          return this.http.get<T>(route, header);
        case 'POST':
          return this.http.post<T>(route, httpParams, header);
        case 'PUT':
          return this.http.put<T>(route, httpParams, header);
        case 'DELETE':
          return this.http.delete<T>(route, header);
        case 'PATCH':
          return this.http.patch<T>(route, httpParams, header);
        default:
          return undefined;
      }
    });
  }
}
