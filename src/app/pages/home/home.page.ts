import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FeedService} from '../../utils/services/http/Marketplace/feed.service';
import {Job} from '../../utils/interfaces/responses/Marketplace';
import {NavController} from '@ionic/angular';
import {ModalService} from '../../utils/services/internal/components/modal/modal.service';
import {ModalContentComponent, ModalOptions} from '../../utils/interfaces/enum/ModalOptions';

@Component({
  selector: 'gig-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  feed: 'me' | 'all' = 'all';
  allJobs: Job[];
  myJobs: Job[];

  constructor(
    public navCtrl: NavController,
    public feedService: FeedService,
    public modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.feedService.jobFeed()
    .then((feed: Job[]) => this.allJobs = feed);
    this.feedService.myProposals()
    .then((feed: Job[]) => this.myJobs = feed);
  }

  doRefresh(event) {
    console.log('Begin async operation');

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
}

@Component({
  selector: 'gig-modal-content',
  template: `
    <div>
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          Filter Jobs
        </h3>
        <div class="mt-2">
          <p class="text-sm leading-5 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
        <span class="flex w-full rounded-md shadow-sm">
          <button type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Go back to dashboard
          </button>
        </span>
    </div>
  `,
  styleUrls: ['home.page.scss']
})
export class HomeFilterModal implements ModalContentComponent {
  modalOptions: ModalOptions;
}
