import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gig-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  feed: 'all' | 'unread' = 'all';
  notifications: any[];

  constructor() { }

  ngOnInit() {
  }

}
