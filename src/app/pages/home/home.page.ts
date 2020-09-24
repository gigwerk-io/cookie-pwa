import {Component, OnInit} from '@angular/core';
import {FeedService} from '../../utils/services/http/Marketplace/feed.service';
import {Job} from '../../utils/interfaces/responses/Marketplace';
import {NavController} from '@ionic/angular';

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
    public feedService: FeedService
  ) {  }

  ngOnInit() {
    this.feedService.jobFeed()
      .then((feed: Job[]) => this.allJobs = feed);
    this.feedService.myProposals()
      .then((feed: Job[]) => this.myJobs = feed);
  }
}
