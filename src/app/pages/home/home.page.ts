import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FeedService} from '../../utils/services/http/Marketplace/feed.service';
import {Job} from '../../utils/interfaces/responses/Marketplace';
import {NavController} from '@ionic/angular';
import {ModalService} from '../../utils/services/internal/components/modal/modal.service';
import {ModalContentComponent, ModalOptions} from '../../utils/interfaces/enum/ModalOptions';
import {Events} from '../../utils/services/internal/events';
import {Response} from '../../utils/interfaces/responses/Response';

interface JobsFilter {
  orderBy: 'Price' | 'Distance',
  orientation: 'Asc' | 'Desc'
}

@Component({
  selector: 'gig-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  feed: 'me' | 'all' = 'all';
  allJobs: Job[];
  myJobs: Job[];

  constructor(
    public navCtrl: NavController,
    public feedService: FeedService,
    public modalService: ModalService,
    public events: Events
  ) {
  }

  ngOnInit() {
    this.loadJobs();
  }

  ngOnDestroy() {
    this.events.unsubscribe('home-filter-modal');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.loadJobs();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  openFilterModal() {
    this.modalService.show({
      position: 'middle',
      component: HomeFilterModal
    });
  }

  private loadJobs() {
    this.feedService.jobFeed()
    .then((res: Response<Job[]>) => this.allJobs = res.data);
    this.feedService.myProposals()
    .then((res: Response<Job[]>) => this.myJobs = res.data);

    this.setJobsFilter();
  }

  private setJobsFilter() {
    this.events.subscribe('home-filter-modal',
      (jobsFilter: JobsFilter) => {
        switch (jobsFilter.orderBy) {
          case 'Distance':
            this.allJobs.sort((a: Job, b: Job) => (a.distance_away >= b.distance_away) ? 1 : -1);
            this.myJobs.sort((a: Job, b: Job) => (a.distance_away >= b.distance_away) ? 1 : -1);
            break;
          case 'Price':
            this.allJobs.sort((a: Job, b: Job) => (a.price >= b.price) ? 1 : -1);
            this.myJobs.sort((a: Job, b: Job) => (a.price >= b.price) ? 1 : -1);
            break;
        }

        if (jobsFilter.orientation == 'Desc') {
          this.allJobs.reverse();
          this.myJobs.reverse();
        }
      });
  }
}

@Component({
  selector: 'gig-home-filter-modal',
  template: `
    <div>
      <div class="text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          Filter Jobs
        </h3>
        <div class="mt-2">
          <div>
            <label for="order-by" class="text-left block text-sm leading-5 font-medium text-gray-700">
              Order by
            </label>
            <select [(ngModel)]="filterOptions.orderBy" id="order-by"
                    class="bg-gray-300 rounded mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
              <option value="Price">Price</option>
              <option selected value="Distance">Distance</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <div>
            <label for="orientation" class="text-left block text-sm leading-5 font-medium text-gray-700">
              Orientation
            </label>
            <select [(ngModel)]="filterOptions.orientation" id="orientation"
                    class="bg-gray-300 rounded mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
              <option selected value="Asc">Asc</option>
              <option value="Desc">Desc</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <span class="flex w-full rounded-md shadow-sm">
            <button (click)="setFilterOptions()" type="button"
                    class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Set Filter Options
            </button>
          </span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['home.page.scss']
})
export class HomeFilterModal implements ModalContentComponent {
  modalOptions: ModalOptions;
  filterOptions: JobsFilter = {
    orderBy: undefined,
    orientation: undefined
  };

  constructor(
    public events: Events,
    public modalService: ModalService
  ) {
  }

  setFilterOptions() {
    this.events.publish('home-filter-modal', this.filterOptions);
    this.modalService.dismiss();
  }
}
