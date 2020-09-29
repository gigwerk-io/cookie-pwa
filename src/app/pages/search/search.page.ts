import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ProfileService} from '../../utils/services/http/User/profile.service';
import {User} from '../../utils/interfaces/models/User';
import {Response} from '../../utils/interfaces/responses/Response';

@Component({
  selector: 'gig-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  results: User[];
  query: string;
  isFocused: boolean = false;

  // Observable for debouncing input changes
  private inputDebouncerSubject: Subject<string> = new Subject();
  private inputDebouncerSub: Subscription;

  constructor(
    public navCtrl: NavController,
    public profileService: ProfileService
  ) { }

  ngOnInit() {
    this.loadInputSubject();
  }

  ngOnDestroy() {
    this.inputDebouncerSub.unsubscribe();
  }

  onInputChange(query: string) {
    if (query.length < 1 || query == '') {
      this.clearResults();
    } else {
      this.inputDebouncerSubject.next(query);
      console.log(this.results);
    }
  }

  loadInputSubject() {
    this.inputDebouncerSub = this.inputDebouncerSubject.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe((query: string) => (query) ?
      this.profileService.searchUser(query)
        .then((res: Response<User[]>) =>
          this.results = res.data
        ): undefined
    );
  }

  clearResults() {
    this.query = undefined;
    this.results = undefined;
    console.log('clear');
  }

  openProfile(userId: number) {
    console.log('open profile');
  }
}
