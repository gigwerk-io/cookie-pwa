import { Injectable } from '@angular/core';
import {Events} from '../../events';
import {AnnouncementOptions} from '../../../../interfaces/enum/AnnouncementOptions';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(
    private events: Events
  ) { }

  public show(options: AnnouncementOptions) {
    this.events.publish('global-announcement', options);
    if (options.duration) {
      setTimeout(() => this.dismiss(), options.duration);
    }
  }

  public dismiss() {
    this.events.publish('global-announcement-dismiss');
  }
}
