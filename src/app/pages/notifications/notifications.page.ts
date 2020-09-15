import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'gig-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  feed: 'all' | 'unread' = 'all';
  allNotifications: any[];
  unreadNotifications: any[];

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

}
