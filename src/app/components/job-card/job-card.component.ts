import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../utils/interfaces/enum/Status';

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
  @Input() views: any;
  @Input() distance: any;
  @Input() status: Status;
  time: number = 45;
  statusColor: string;

  constructor() { }

  ngOnInit() {}

}
