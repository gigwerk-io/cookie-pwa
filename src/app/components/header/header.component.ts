import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {get, remove} from '../../utils/services/internal/storage';
import {StorageKeys} from '../../utils/interfaces/enum/Constants';
import {AnnouncementOptions} from '../../utils/interfaces/enum/AnnouncementOptions';
import {Events} from '../../utils/services/internal/events';

@Component({
  selector: 'gig-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() announcement: AnnouncementOptions;

  constructor(
    public events: Events
  ) {
  }

  ngOnInit() {
    this.events.subscribe('global-announcement',
      (announcementOptions: AnnouncementOptions) => {
        this.announcement = announcementOptions;
      });
    this.events.subscribe('global-announcement-dismiss', () => this.dismissAnnouncement());
  }

  ngOnDestroy() {
    this.events.unsubscribe('global-announcement');
    this.events.unsubscribe('global-announcement-dismiss');
  }

  dismissAnnouncement() {
    this.announcement = undefined;
  }
}
