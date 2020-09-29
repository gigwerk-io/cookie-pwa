import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../http/Auth/login.service';
import {Response} from '../../interfaces/responses/Response';
import {ValidToken} from '../../interfaces/responses/Auth';
import {NavController} from '@ionic/angular';
import {remove} from '../internal/storage';
import {StorageKeys} from '../../interfaces/enum/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    public navCtrl: NavController,
    public authService: LoginService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state);
    switch (state.url) {
      default: // /sign-in-with-gigwerk route
       return this.authService.validateBusinessToken()
        .then((res: Response<ValidToken>) => {
          if (res.data.validToken) {
            return this.navCtrl.navigateRoot('app/home')
              .then(() => false);
          } else {
            // clear storage
            remove(StorageKeys.AccessToken);
            return true;
          }
        })
        .catch(err => {
          // clear storage
          remove(StorageKeys.AccessToken);
          return true;
        });
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    switch (route) {
      default: // /app route
        return this.authService.validateBusinessToken()
          .then((res: Response<ValidToken>) => {
            if (res.data.validToken) {
              return true;
            } else {
              // clear storage
              remove(StorageKeys.AccessToken);
              return this.navCtrl.navigateRoot('sign-in-with-gigwerk')
              .then(() => false);
            }
          })
          .catch(err => {
            // clear storage
            remove(StorageKeys.AccessToken);
            return this.navCtrl.navigateRoot('sign-in-with-gigwerk')
              .then(() => false);
          });
    }
  }
  
}
