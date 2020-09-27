import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'gig-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() imgSrc: string;
  @Input() imgAlt: string;
  @Input() imgClass: string;

  isLoading: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

}
