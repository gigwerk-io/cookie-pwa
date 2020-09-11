import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gig-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  results: any[];

  constructor() { }

  ngOnInit() {
  }

}
