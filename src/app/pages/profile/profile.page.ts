import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from 'src/app/utils/services/profile/profile.service';
import {Location} from '@angular/common';


@Component({
  selector: 'gig-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;
  picture: string;
  last_name: string;
  first_name: string;
  username: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private location: Location
  ) { }

  ngOnInit() {

    return this.profileService.getProfile(this.route.snapshot.paramMap.get("user_id")).then(res => {
      console.log(res.data);
      this.email = res.data['email'];
      this.picture = res.data['profile']['image'];
      this.first_name = res.data['first_name'];
      this.last_name = res.data['last_name'];
      this.username = res.data['username'];
    });
  }

  back() {
    this.location.back();
  }

}
