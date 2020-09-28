import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SearchService } from 'src/app/utils/services/search/search.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'gig-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  results: any[];

  constructor(
    public router: Router,
    private searchService: SearchService
  ) { }

  form = new FormGroup({
    searchInput: new FormControl('', Validators.required),
  });

  ngOnInit() {
    
  }

  searchUsers(usernameNameEmail) {
    return this.searchService.searchUsers(usernameNameEmail.searchInput).then(res => {
      console.log(res.data);
      if (res.data.length > 1) {
        return this.results = res.data;
      } else {
        return this.results = null;
      }
    });
  }

}
