import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'gig-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  feed: 'me' | 'all' = 'all';
  allFeed: any[];
  myFeed: any[];

  constructor() {
  }

  ngOnInit() {
  }

}
