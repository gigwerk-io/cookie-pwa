import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Events} from '../../utils/services/internal/events';
import {Alert} from '../../utils/interfaces/enum/Alert';

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

  constructor(
    public events: Events
  ) {
  }

  ngOnInit() {
    this.events.subscribe('global-alert',
      (alert: Alert) => {
        this.show = true;
        this.pos = alert.position;
        this.animation = alert.enterAnimation;
        this.actionButton = alert.actionButton;
        this.color = alert.color;
        this.alertMessage = alert.alertMessage;
      });
    this.events.subscribe('global-alert-dismiss', (alert: {animation: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown'}) => {
      if (alert) {
        this.animation = alert.animation;
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
