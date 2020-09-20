import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {remove} from '../../utils/services/internal/storage';
import {StorageKeys} from '../../utils/interfaces/enum/Constants';
import {AuthService} from '../../utils/services/http/Auth/auth.service';

@Component({
  selector: 'gig-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.logout()
      .then(() => {
        this.navCtrl.navigateRoot('sign-in-with-gigwerk');
      });
  }
}
