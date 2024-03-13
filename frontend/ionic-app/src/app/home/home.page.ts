import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private apiService = inject(ApiService);
  userData: any;
  teamData: any;
  gameData: any;
  constructor(private router: Router) {}
  // on initialize run a function
  async ngOnInit() {
    try {
      // Call the getAll method of the ApiService with the endpoint 'player'
      // store the result's user value to the userData variable
      this.userData = await this.apiService.getUser();
      this.userData = this.userData.user;
      this.teamData = await this.apiService.getAll('team');
      this.gameData = await this.apiService.getAll('game');
      console.log(this.gameData);
      console.log(this.teamData);
      console.log(this.userData);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  }

  logout() {
    this.apiService.logout();
    //redirect to login

    this.router.navigate(['/login']);
  }
}
