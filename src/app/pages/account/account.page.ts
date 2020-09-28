import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../utils/services/http/Auth/login.service';
import { AlertService } from '../../utils/services/internal/components/alert/alert.service';
import { Response } from '../../utils/interfaces/responses/Response';

@Component({
  selector: 'gig-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public authService: LoginService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
  }


}
