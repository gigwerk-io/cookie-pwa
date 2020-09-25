import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'gig-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  feed: 'me' | 'all' = 'all';
  allJobs: any[] = [1];
  myJobs: any[];

  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
  }
}
