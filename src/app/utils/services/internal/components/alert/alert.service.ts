import { Injectable } from '@angular/core';
import {Events} from '../../events';
import {AlertOptions} from '../../../../interfaces/enum/AlertOptions';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private events: Events
  ) { }

  public show(options: AlertOptions) {
    this.events.publish('global-alert', options);

    if (options.duration) {
      const leaveAnimation = options.leaveAnimation ? options.leaveAnimation : '';
      setTimeout(() => this.dismiss({animation: leaveAnimation}), options.duration);
    }
  }

  public dismiss(options?: {animation: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown' | ''}) {
    this.events.publish('global-alert-dismiss', options);
  }
}
