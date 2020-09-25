import { Injectable } from '@angular/core';
import {RestService} from '../rest.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends RestService {

  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient);
  }
}
