import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {HttpClient} from '@angular/common/http';
import {Response} from '../../../interfaces/responses/Response';

@Injectable({
  providedIn: 'root'
})
export class FreelancerActionsService extends RestService {

  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public acceptJob(jobId: number): Promise<string> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/accept`, 'POST')
    .then(httpRes => httpRes.toPromise()
    .then(res => res.message));
  }

  public withdrawProposal(jobId: number): Promise<string> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/withdraw`, 'POST')
    .then(httpRes => httpRes.toPromise()
    .then(res => res.message));
  }

  public arriveToJob(jobId: number): Promise<string> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/arrive`, 'POST')
    .then(httpRes => httpRes.toPromise()
    .then(res => res.message));
  }

  public completeJob(jobId: number): Promise<string> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/complete`, 'POST')
    .then(httpRes => httpRes.toPromise()
    .then(res => res.message));
  }
}
