import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import {Observable} from 'rxjs';
import { User } from 'src/app/utils/interfaces/models/User';
import { Response } from 'src/app/utils/interfaces/responses/Response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends RestService {

  constructor(public http: HttpClient) { 
    super(http);
  }

  getProfile(user_id: string): Promise<Response<User>> {

    return this.makeHttpRequest(`profile/${user_id}`, `GET`)
    .then((res:  Observable<Response<User>>) => res.toPromise());
  }
}
