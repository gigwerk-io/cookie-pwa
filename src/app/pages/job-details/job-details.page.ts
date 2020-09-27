import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../utils/interfaces/responses/Marketplace';
import {FeedService} from '../../utils/services/http/Marketplace/feed.service';
import {Status, StatusConst} from '../../utils/interfaces/enum/Status';
import {Intensity, IntensityConst} from '../../utils/interfaces/enum/Intensity';
import {ModalContentComponent, ModalOptions} from '../../utils/interfaces/enum/ModalOptions';
import {ModalService} from '../../utils/services/internal/components/modal/modal.service';
import {AlertService} from '../../utils/services/internal/components/alert/alert.service';
import {FreelancerActionsService} from '../../utils/services/http/Marketplace/freelancer-actions.service';
import {Events} from '../../utils/services/internal/events';

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
export class JobDetailsPage implements OnInit, OnDestroy {
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
      callback: async () => {
        this.loading = true;
        await this.freelancerActionsService.acceptJob(this.jobDetail.id)
        .then(async message => {
          await this.loadJob();
          await this.alertService.show({
            alertMessage: message,
            color: 'green',
            position: 'top-0',
            enterAnimation: 'top-slidedown',
            leaveAnimation: 'top-slideup',
            duration: 4000,
            showCloseButton: false
          });
        })
        .catch(e =>
          this.alertService.show({
            alertMessage: e.error.message,
            color: 'red',
            position: 'top-0',
            enterAnimation: 'top-slidedown',
            leaveAnimation: 'top-slideup',
            duration: 4000,
            showCloseButton: false
          }));
        this.loading = false;
      }
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
      callback: async () => {
        this.loading = true;
        await this.freelancerActionsService.arriveToJob(this.jobDetail.id)
        .then(async message => {
          await this.loadJob();
          await this.alertService.show({
            alertMessage: message,
            color: 'blue',
            position: 'top-0',
            enterAnimation: 'top-slidedown',
            leaveAnimation: 'top-slideup',
            duration: 4000,
            showCloseButton: false
          });
        })
        .catch(e =>
          this.alertService.show({
            alertMessage: e.error.message,
            color: 'red',
            position: 'top-0',
            enterAnimation: 'top-slidedown',
            leaveAnimation: 'top-slideup',
            duration: 4000,
            showCloseButton: false
          }));
        this.loading = false;
      }
    },
    {
      id: 6,
      button: {
        text: 'Mark Job as Completed',
        color: 'green'
      },
      callback: async () => {
        this.loading = true;
        await this.freelancerActionsService.completeJob(this.jobDetail.id)
        .then(async message => {
          await this.loadJob();
          await this.alertService.show({
            alertMessage: message,
            color: 'green',
            position: 'top-0',
            enterAnimation: 'top-slidedown',
            leaveAnimation: 'top-slideup',
            duration: 4000,
            showCloseButton: false
          });
        })
        .catch(e =>
          this.alertService.show({
            alertMessage: e.error.message,
            color: 'red',
            position: 'top-0',
            enterAnimation: 'top-slidedown',
            leaveAnimation: 'top-slideup',
            duration: 4000,
            showCloseButton: false
          }));
        this.loading = false;
      }
    }
  ];
  jobAction: JobAction;
  loading: boolean = false;

  constructor(
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public feedService: FeedService,
    public freelancerActionsService: FreelancerActionsService,
    public modalService: ModalService,
    public alertService: AlertService,
    public events: Events
  ) {
  }

  ngOnInit() {
    this.loadJob();
    this.events.subscribe('withdrawProposal',
      async (res: { message: string }) => {
        this.loading = true;
        await this.loadJob();
        await this.alertService.show({
          alertMessage: res.message,
          color: 'red',
          position: 'top-0',
          enterAnimation: 'top-slidedown',
          leaveAnimation: 'top-slideup',
          duration: 4000,
          showCloseButton: false
        });
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.events.unsubscribe('withdrawProposal');
  }

  private async loadJob() {
    const jobId: number = await this.activatedRoute.snapshot.params.id;
    await this.feedService.showJob(jobId)
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
      component: JobDetailsMoreModal,
      data: this.jobDetail
    });
  }
}

@Component({
  selector: 'gig-job-detail-more-modal',
  template: `

    <div>
      <div class="text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          Options
        </h3>
        <div class="mt-2" *ngIf="modalOptions.data">
          <span *ngIf="modalOptions.data.action == 3 || modalOptions.data.action == 5" class="flex w-full rounded-md shadow-sm">
            <button [disabled]="loading" (click)="withdrawProposal()" type="button"
                    class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              <ng-container *ngIf="!loading">
                Withdraw
              </ng-container>
              <ion-spinner name="dots" [ngClass]="!loading ? 'hidden' : ''" class="text-white"></ion-spinner>
            </button>
          </span>
        </div>
        <div class="mt-2">
          <span class="flex w-full rounded-md shadow-sm">
            <button (click)="reportAbuse()" type="button"
                    class="inline-flex justify-center w-full rounded-md border border-solid px-4 py-2 bg-gray-100 border border-red-500 text-base leading-6 font-medium text-red-500 shadow-sm hover:bg-gray-200 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Report Abuse
            </button>
          </span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./job-details.page.scss']
})
export class JobDetailsMoreModal implements ModalContentComponent {
  modalOptions: ModalOptions;
  loading: boolean = false;

  constructor(
    public freelancerActionsService: FreelancerActionsService,
    public modalService: ModalService,
    public events: Events
  ) {
  }

  withdrawProposal() {
    this.loading = true;
    const jobId: number = this.modalOptions.data.id;
    this.freelancerActionsService.withdrawProposal(jobId)
    .then((message: string) => {
      this.events.publish('withdrawProposal', {message: message});
      this.modalService.dismiss();
    })
    .catch(e => {
      this.events.publish('withdrawProposal', {message: e.error.message});
      this.modalService.dismiss();
    });
  }

  reportAbuse() {
    console.log('report abuse');
  }
}
