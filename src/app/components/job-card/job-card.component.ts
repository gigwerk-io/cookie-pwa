import {Component, Input, OnInit} from '@angular/core';
import {Status, StatusConst} from '../../utils/interfaces/enum/Status';
import {Intensity, IntensityConst} from '../../utils/interfaces/enum/Intensity';
import {NavController} from '@ionic/angular';

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
  @Input() intensity: Intensity;

  time: number = 45;
  jobStatus: Status;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    if (this.status) {
      this.jobStatus = StatusConst[this.status.name.split(' ').join('')];
    }
  }

  displayPrice(price: string) {
    const splitPrice: string[] = price.split('.');
    if (splitPrice[1] == '00') {
      return splitPrice[0];
    } else {
      return price;
    }
  }

  displayIntensity(intensityId: number) {
    return IntensityConst[intensityId];
  }

  openJobDetails() {
    console.log('open job details');
    this.navCtrl.navigateForward('app/home/job-details')
  }
}
