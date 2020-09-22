import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {remove} from '../../utils/services/internal/storage';
import {StorageKeys} from '../../utils/interfaces/enum/Constants';
import {AuthService} from '../../utils/services/http/Auth/auth.service';
import {AlertService} from '../../utils/services/internal/components/alert/alert.service';

@Component({
  selector: 'gig-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.endSession()
      .then((res) => {
        this.alertService.show({alertMessage: res.message, color: 'green', position: 'top-0', enterAnimation: 'top-slidedown', leaveAnimation: 'top-slideup', duration: 4000})
        this.navCtrl.navigateRoot('sign-in-with-gigwerk');
      });
  }
}
