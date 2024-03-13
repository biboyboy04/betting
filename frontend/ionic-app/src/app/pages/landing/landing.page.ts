import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { UserRedirectService } from 'src/app/services/user-redirect.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  playerData: any;
  constructor(
    private apiService: ApiService,
    private userRedirectService: UserRedirectService
  ) {}

  ngOnInit() {
    this.apiService
      .getUser()
      .then((userDetails: any) => {
        this.userRedirectService.redirectLoggedUser(userDetails);
      })
      .catch((error) => {
        console.error('Error retrieving user details:', error);
      });
  }

  fetchPlayerData() {}
}
