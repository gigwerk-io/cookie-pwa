import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'gig-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public router: Router,
    public location: Location,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

}
