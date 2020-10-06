import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import {Location} from '@angular/common';
import { ProfileService } from 'src/app/utils/services/http/Profile/profile.service';
import {User} from '../../utils/interfaces/models/User';


@Component({
  selector: 'gig-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private location: Location
  ) { }

  ngOnInit() {

    return this.profileService.getProfile(this.route.snapshot.paramMap.get("user_id")).then(res => {
      console.log(res.data);
      this.user = res.data;
    });
  }

  back() {
    this.location.back();
  }

}
