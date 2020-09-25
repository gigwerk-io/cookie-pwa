import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../utils/interfaces/responses/Marketplace';
import {FeedService} from '../../utils/services/http/Marketplace/feed.service';

@Component({
  selector: 'gig-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  feed: 'details' | 'checklist' = 'details';
  jobDetail: Job;

  constructor(
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public feedService: FeedService
  ) { }

  ngOnInit() {
    this.loadJob();
  }

  private loadJob() {
    const jobId: number = this.activatedRoute.snapshot.params.id;
    this.feedService.showJob(jobId)
    .then((job: Job) => this.jobDetail = job);
  }
}
