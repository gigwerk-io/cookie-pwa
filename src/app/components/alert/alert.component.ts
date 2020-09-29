import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Events} from '../../utils/services/internal/events';
import {AlertOptions} from '../../utils/interfaces/enum/AlertOptions';

@Component({
  selector: 'gig-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input('showAlert') show: boolean = false;
  @Input('position') pos: 'top-0' | 'middle' | 'bottom-0' = 'bottom-0';
  @Input('animation') animation: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown' | '';
  @Input('actionButton') actionButton: {
    title: string;
    callback: (..._: any) => void;
  };
  @Input('color') color: string = 'indigo';
  @Input('alertMessage') alertMessage: string = '{Message here}';
  @Input('showCloseButton') showCloseButton: boolean = true;

  constructor(
    public events: Events
  ) {
  }

  ngOnInit() {
    this.events.subscribe('global-alert',
      (alertOptions: AlertOptions) => {
        this.show = true;
        this.pos = alertOptions.position;
        this.animation = alertOptions.enterAnimation;
        this.actionButton = alertOptions.actionButton;
        this.color = alertOptions.color;
        this.alertMessage = alertOptions.alertMessage;

        if (alertOptions.showCloseButton != undefined) {
          this.showCloseButton = alertOptions.showCloseButton;
        }
      });
    this.events.subscribe('global-alert-dismiss', (alertOptions: {animation: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown'}) => {
      if (alertOptions) {
        this.animation = alertOptions.animation;
        setTimeout(() => this.show = false, 4000);
      } else {
        this.show = false;
      }
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe('global-alert');
    this.events.unsubscribe('global-alert-dismiss');
  }

}
