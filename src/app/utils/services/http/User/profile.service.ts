import { Injectable } from '@angular/core';
import {RestService} from '../rest.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../interfaces/models/User';
import {Response} from '../../../interfaces/responses/Response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends RestService {

  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public searchUser(query: string): Promise<User[]> {
    return this.makeHttpRequest<Response<User[]>>(`search`, 'GET', {search: query})
      .then(httpRes => httpRes.toPromise()
        .then(res => res.data));
  }
}
