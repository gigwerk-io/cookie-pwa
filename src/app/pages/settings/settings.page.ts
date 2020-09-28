import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'gig-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  year = new Date().getFullYear();
  version: any = environment.appVersion;

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

}
