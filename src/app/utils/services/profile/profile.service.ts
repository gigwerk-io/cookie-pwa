import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/models/User';
import { RestService } from '../http/rest.service';
import {Response} from '../../interfaces/responses/Response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends RestService {

  constructor(public http: HttpClient) { 
    super(http);
  }

  getProfile(user_id: string): Promise<Response<User[]>> {

    return this.makeHttpRequest(`profile/${user_id}`, `GET`)
    .then((res:  Observable<Response<User[]>>) => res.toPromise());
  }
}
