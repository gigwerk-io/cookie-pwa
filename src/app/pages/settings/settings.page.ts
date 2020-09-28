import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'gig-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  year = new Date().getFullYear();

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    console.log('in the settings page')
  }

}
