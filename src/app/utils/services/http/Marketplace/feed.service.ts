import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {HttpClient} from '@angular/common/http';
import {Job} from '../../../interfaces/responses/Marketplace';
import {Response} from '../../../interfaces/responses/Response';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends RestService {

  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public jobFeed(): Promise<Job[]> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/feed`, 'GET')
    .then(httpRes => httpRes.toPromise()
    .then((res: Response<Job[]>) => {
      return res.data;
    }));
  }

  public myJobRequests(): Promise<Job[]> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/me`, 'GET')
    .then(httpRes => httpRes.toPromise()
    .then((res: Response<Job[]>) => {
      return res.data;
    }));
  }

  public myProposals(): Promise<Job[]> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/proposals`, 'GET')
    .then(httpRes => httpRes.toPromise()
    .then((res: Response<Job[]>) => {
      return res.data;
    }));
  }
}
