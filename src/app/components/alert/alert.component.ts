import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Events} from '../../utils/services/internal/events';

@Component({
  selector: 'gig-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input('showAlert') show: boolean = false;
  @Input('position') pos: 'top-0' | 'middle' | 'bottom-0' = 'bottom-0';
  @Input('animation') animation: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown';
  @Input('actionButton') actionButton: {
    title: string;
    callback: any;
  };
  @Input('color') color: string = 'indigo';
  @Input('alertMessage') alertMessage: string = '{Message here}';

  constructor(
    public events: Events
  ) { }

  ngOnInit() {
    this.events.subscribe('global-alert',
      (
        alertMessage: string = undefined,
        color: string = 'indigo',
        actionButton: {
          title: string;
          callback: any;
        } = undefined,
        position: 'top-0' | 'middle' | 'bottom-0' = 'bottom-0',
        animation: 'top-slideup' | 'top-slidedown' | 'bottom-slideup' | 'bottom-slidedown' = undefined
      ) => {
      this.show = true;
      this.pos = position;
      this.animation = animation;
      this.actionButton = actionButton;
      this.color = color;
      this.alertMessage = alertMessage;
    })
  }

  ngOnDestroy() {
    this.events.unsubscribe('global-alert');
  }

}
