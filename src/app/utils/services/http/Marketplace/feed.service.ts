import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Job} from '../../../interfaces/responses/Marketplace';
import {Response} from '../../../interfaces/responses/Response';
import {AnnouncementService} from '../../internal/components/announcement/announcement.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends RestService {

  constructor(
    public httpClient: HttpClient,
    public announcementService: AnnouncementService
  ) {
    super(httpClient);
  }

  public jobFeed(): Promise<Response<Job[]>> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/feed`, 'GET')
    .then(httpRes => httpRes.toPromise())
    .catch((e: HttpErrorResponse) => {
      console.log(e.status);
      this.announcementService.show({
        message: 'Something went wrong with this request.',
        color: 'red'
      });
      return undefined;
    });
  }

  public myJobRequests(): Promise<Response<Job[]>> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/me`, 'GET')
    .then(httpRes => httpRes.toPromise())
    .catch((e: HttpErrorResponse) => {
      console.log(e.status);
      this.announcementService.show({
        message: 'Something went wrong with this request.',
        color: 'red'
      });
      return undefined;
    });
  }

  public myProposals(): Promise<Response<Job[]>> {
    return this.makeHttpRequest<Response<Job[]>>(`marketplace/proposals`, 'GET')
    .then(httpRes => httpRes.toPromise())
    .catch((e: HttpErrorResponse) => {
      console.log(e.status);
      this.announcementService.show({
        message: 'Something went wrong with this request.',
        color: 'red'
      });
      return undefined;
    });
  }

  public showJob(id: number): Promise<Response<Job>> {
    return this.makeHttpRequest<Response<Job>>(`marketplace/job/${id}`, 'GET')
    .then(httpRes => httpRes.toPromise())
    .catch((e: HttpErrorResponse) => {
      console.log(e.status);
      this.announcementService.show({
        message: 'Something went wrong with this request.',
        color: 'red'
      });
      return undefined;
    });
  }
}
