import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Response} from '../../../interfaces/responses/Response';
import {AnnouncementService} from '../../internal/components/announcement/announcement.service';

@Injectable({
  providedIn: 'root'
})
export class FreelancerActionsService extends RestService {

  constructor(
    public httpClient: HttpClient,
    public announcementService: AnnouncementService
  ) {
    super(httpClient);
  }

  public acceptJob(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/accept`, 'POST')
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

  public withdrawProposal(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/withdraw`, 'POST')
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

  public arriveToJob(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/arrive`, 'POST')
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

  public completeJob(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/complete`, 'POST')
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
