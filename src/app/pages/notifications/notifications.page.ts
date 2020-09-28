import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'gig-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  feed: 'all' | 'unread' = 'all';
  allNotifications: any[] = [1];
  unreadNotifications: any[] = [1];

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

}
