import {Injectable} from '@angular/core';
import {Response} from '../../interfaces/responses/Response';
import {Login, ValidToken} from '../../interfaces/responses/Auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {remove, set} from '../internal/storage';
import {StorageKeys} from '../../interfaces/enum/Constants';
import { RestService } from '../http/rest.service';
import { Search } from '../../interfaces/models/Search';
import { Business } from '../../interfaces/models/Business';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService extends RestService{

  public business: Business;

  constructor(public http: HttpClient) {
    super(http);
  }

  searchUsers(usernameNameEmail: string): Promise<Response<Search[]>> {
    let params = null;
    if (usernameNameEmail != null) {
     params = {'search': usernameNameEmail};
    }

    return this.makeHttpRequest(`search`, `GET`, params)
    .then((res:  Observable<Response<Search[]>>) => res.toPromise());
  }
}
