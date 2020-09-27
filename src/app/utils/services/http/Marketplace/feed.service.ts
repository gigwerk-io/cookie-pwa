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

  public jobFeed(): Promise<Response<Job[]>> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/feed`, 'GET')
    .then(httpRes => httpRes.toPromise());
  }

  public myJobRequests(): Promise<Response<Job[]>> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/me`, 'GET')
    .then(httpRes => httpRes.toPromise());
  }

  public myProposals(): Promise<Response<Job[]>> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/proposals`, 'GET')
    .then(httpRes => httpRes.toPromise());
  }

  public showJob(id: number): Promise<Response<Job>> {
    return this.makeHttpRequest<Response<Job>>(`marketplace/job/${id}`, 'GET')
    .then(httpRes => httpRes.toPromise());
  }
}
