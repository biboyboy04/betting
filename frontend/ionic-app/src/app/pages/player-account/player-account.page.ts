import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-account',
  templateUrl: './player-account.page.html',
  styleUrls: ['./player-account.page.scss'],
})
export class PlayerAccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  user = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    nationality: '',
    balance: ''
  };

  updateProfile() {
    // Implement logic to update user profile
    console.log('Updated profile:', this.user);
    // You can send the updated user data to your backend API here
  }
}
