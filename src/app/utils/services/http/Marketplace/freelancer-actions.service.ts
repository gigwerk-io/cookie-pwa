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

  public acceptJob(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/accept`, 'POST')
    .then(httpRes => httpRes.toPromise());
  }

  public withdrawProposal(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/withdraw`, 'POST')
    .then(httpRes => httpRes.toPromise());
  }

  public arriveToJob(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/arrive`, 'POST')
    .then(httpRes => httpRes.toPromise());
  }

  public completeJob(jobId: number): Promise<Response<null>> {
    return this.makeHttpRequest<Response<null>>(`marketplace/job/${jobId}/complete`, 'POST')
    .then(httpRes => httpRes.toPromise());
  }
}
