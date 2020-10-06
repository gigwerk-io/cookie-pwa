import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {LoginService} from '../../utils/services/http/Auth/login.service';
import {AlertService} from '../../utils/services/internal/components/alert/alert.service';
import {Response} from '../../utils/interfaces/responses/Response';
import {Router} from '@angular/router';
import {User} from '../../utils/interfaces/models/User';
import {get} from '../../utils/services/internal/storage';
import {StorageKeys} from '../../utils/interfaces/enum/Constants';

@Component({
  selector: 'gig-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  baseRoute: string;
  user: User;

  constructor(
    public navCtrl: NavController,
    public authService: LoginService,
    public alertService: AlertService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.baseRoute = this.router.url.split('/').join('/');
    get(StorageKeys.User)
      .then((user: User) => this.user = user);
  }

  signOut() {
    this.authService.endSession()
    .then((res: Response<string>) => {
      this.alertService.show({
        alertMessage: res.message,
        color: 'green',
        position: 'top-0',
        enterAnimation: 'top-slidedown',
        leaveAnimation: 'top-slideup',
        duration: 4000
      });
      this.navCtrl.navigateRoot('sign-in-with-gigwerk');
    });
  }
}
