import {Component, Input, OnInit} from '@angular/core';
import {Status, StatusConst} from '../../utils/interfaces/enum/Status';

@Component({
  selector: 'gig-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit {

  @Input() category: string;
  @Input() subCategory: string;
  @Input() price: number;
  @Input() completeByDate: any;
  @Input() views: number;
  @Input() distance: number;
  @Input() status: Status;
  time: number = 45;
  jobStatus: Status;

  constructor() { }

  ngOnInit() {
    if (this.status) {
      this.jobStatus = StatusConst[this.status.name.split(' ').join('')];
    }
  }

}
