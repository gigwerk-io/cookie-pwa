import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../utils/services/http/Auth/auth.service';
import {NavController} from '@ionic/angular';
import {AlertService} from '../../utils/services/internal/components/alert/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'gig-sign-in-with-gigwerk',
  templateUrl: './sign-in-with-gigwerk.page.html',
  styleUrls: ['./sign-in-with-gigwerk.page.scss'],
})
export class SignInWithGigwerkPage implements OnInit {

  signInWithGigwerk: boolean = false;
  signInForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public alertService: AlertService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  signIn() {
    if (this.signInForm.valid) {
      this.authService.businessAppLogin(this.signInForm.value)
      .then(() => {
        this.navCtrl.navigateRoot('app/home');
      })
      .catch(e => {
        console.log(e);
        this.alertService.show({
          duration: 4000,
          alertMessage: e.error.message,
          color: 'red',
          position: 'bottom-0',
          enterAnimation: 'bottom-slideup',
          leaveAnimation: 'bottom-slidedown',
          actionButton: {
            title: 'Forgot Password',
            callback: () => console.log('Forgot password!')
          }
        });
      });
    }
  }
}
