import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../utils/interfaces/responses/Marketplace';
import {FeedService} from '../../utils/services/http/Marketplace/feed.service';
import {Status, StatusConst} from '../../utils/interfaces/enum/Status';
import {Intensity, IntensityConst} from '../../utils/interfaces/enum/Intensity';
import {ModalContentComponent, ModalOptions} from '../../utils/interfaces/enum/ModalOptions';
import {ModalService} from '../../utils/services/internal/components/modal/modal.service';

interface JobAction {
  id: number,
  button: {
    text: string,
    color: string
  }
  callback: (..._: any) => any
}

/**
 * All of the possible actions from the backend
 *
 const JOB_IS_EDITABLE = 1; // possible actions: [view, edit, cancel]
 const JOB_CAN_BE_ACCEPTED = 2; // possible actions: [view, accept]
 const WORKER_IS_WAITING_FOR_CUSTOMER = 3; // possible actions: [view, withdraw]
 const NO_PERFORMABLE_ACTION = 4; // possible actions: [view]
 const WORKER_HAS_BEEN_APPROVED =  5;// possible actions: [view, chat, arrive, withdraw]
 const WORKER_IS_IN_PROGRESS = 6; // possible actions: [view, chat, complete]
 const CUSTOMER_NEEDS_TO_RESPOND = 7; // possible actions: [view, approve, reject, cancel]
 const CUSTOMER_WAITING_FOR_WORKER_ARRIVAL = 8; // possible actions: [view, cancel]
 const CUSTOMER_WAITING_FOR_WORKER_TO_FINISH = 9; // possible actions [view]
 const CUSTOMER_NEEDS_TO_REVIEW = 10; // possible actions [view, review]
 const JOB_IS_COMPLETE = 11; // possible actions: [view]
 const WORKER_IS_REJECTED = 12;

 Customer Actions Table
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  ID   |            Action Name            |   View   |   Edit  |   Cancel   |    Approve   |   Reject    |   Review  |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  1    |   JOB_IS_EDITABLE                 |   Yes    |   Yes   |     No     |      No      |     No      |    No     |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  4    |   NO_PERFORMABLE_ACTION           |   Yes    |   No    |     No     |      No      |     No      |    No     |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  7    |   CUSTOMER_NEEDS_TO_RESPOND       |   Yes    |   No    |     Yes    |      Yes     |     Yes     |    No     |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  8    |   CUSTOMER_WAITING_WORKER_ARRIVAL |   Yes    |   No    |     Yes    |      No      |     No      |    No     |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  9    |   CUSTOMER_WAITING_WORKER_FINISH  |   Yes    |   No    |     No     |      No      |     No      |    No     |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  10   |   CUSTOMER_NEEDS_TO_REVIEW        |   Yes    |   No    |     No     |      No      |     No      |    Yes    |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|
 |  11   |   JOB_IS_COMPLETE                 |   Yes    |   No    |     No     |      No      |     No      |     No    |
 |-------|-----------------------------------|----------|---------|------------|--------------|-------------|-----------|

 Worker Actions Table
 |-------|-----------------------------------|----------|------------|------------|--------------|-------------|------------|
 |  ID   |            Action Name            |   View   |   Accept   |  Withdraw  |    Arrive    |    Chat     |  Complete  |
 |-------|-----------------------------------|----------|------------|------------|--------------|-------------|------------|
 |  2    |    JOB_CAN_BE_ACCEPTED            |   Yes    |     Yes    |      No    |      No      |     No      |     No     |
 |-------|-----------------------------------|----------|------------|------------|--------------|-------------|------------|
 |  3    |    WORKER_IS_WAITING_FOR_CUSTOMER |   Yes    |     No     |     Yes    |      No      |     No      |     No     |
 |-------|-----------------------------------|----------|------------|------------|--------------|-------------|------------|
 |  5    |    WORKER_HAS_HAS_BEEN_APPROVED   |   Yes    |     No     |     Yes    |     Yes      |     Yes     |     No     |
 |-------|-----------------------------------|----------|------------|------------|--------------|-------------|------------|
 |  6    |    WORKER_IS_IN_PROGRESS          |   Yes    |     No     |     No     |      No      |     Yes     |    Yes     |
 |-------|-----------------------------------|----------|------------|------------|--------------|-------------|------------|
 |  12   |    WORKER_IS_REJECTED             |   No     |     No     |     No     |      No      |      No     |     No     |
 |-------|-----------------------------------|----------|------------|------------|--------------|-------------|------------|
 */

@Component({
  selector: 'gig-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  feed: 'details' | 'checklist' = 'details';
  jobDetail: Job;
  jobStatus: Status;
  // get job action by jobActions[job.action - 1]
  jobActions: JobAction[] = [
    {
      id: 1,
      button: undefined,
      callback: () => console.log('job is editable')
    },
    {
      id: 2,
      button: {
        text: 'Accept Job',
        color: 'green'
      },
      callback: () => console.log('job is acceptable')
    },
    {
      id: 3,
      button: undefined,
      callback: () => console.log('worker is waiting for customer')
    },
    {
      id: 4,
      button: undefined,
      callback: () => console.log('no performable action')
    },
    {
      id: 5,
      button: {
        text: 'Arrive at Job Site',
        color: 'blue'
      },
      callback: () => console.log('Worker has been approved')
    },
    {
      id: 6,
      button: {
        text: 'Mark Job as Completed',
        color: 'green'
      },
      callback: () => console.log('job is in progress')
    }
  ];
  jobAction: JobAction;

  constructor(
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public feedService: FeedService,
    public modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.loadJob();
  }

  private loadJob() {
    const jobId: number = this.activatedRoute.snapshot.params.id;
    this.feedService.showJob(jobId)
    .then((job: Job) => {
      this.jobDetail = job;
      this.jobStatus = StatusConst[job.status.split(' ').join('')];
      this.jobAction = this.jobActions[job.action - 1];
    });
  }

  displayIntensity(intensityId: number): Intensity {
    return IntensityConst[intensityId];
  }

  displayPrice(price: string): string {
    const splitPrice: string[] = price.split('.');
    if (splitPrice[1] == '00') {
      return splitPrice[0];
    } else {
      return price;
    }
  }

  openMoreModal() {
    this.modalService.show({
      position: 'middle',
      component: JobDetailsMoreModal
    });
  }
}

@Component({
  selector: 'gig-job-detail-more-modal',
  template: ``,
  styleUrls: ['./job-details.page.scss']
})
export class JobDetailsMoreModal implements ModalContentComponent {
  modalOptions: ModalOptions;
}
