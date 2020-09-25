import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'gig-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  feed: 'details' | 'checklist' = 'details';

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

}
