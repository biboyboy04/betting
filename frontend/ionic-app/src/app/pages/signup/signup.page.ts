import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private apiService = inject(ApiService);
  //refactor to interface
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: string = ''; // timestamp data

  // add first name, last name, nationality

  constructor(private router: Router) {}

  ngOnInit() {}

  signup() {
    if (!this.username && !this.password) {
      console.log('Invalid credentials. Please enter a username and password.');
      return;
    } else {
      this.apiService
        .add('player/addPlayer', {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          firstName: this.firstName,
          lastName: this.lastName,
          dateOfBirth: this.dateOfBirth,
          nationality: 'USA',
        })
        .then((response) => {
          console.log(response, 'SIGNUP PAGE');
        })
        .finally(() => {
          this.router.navigate(['/login']);
        });
    }
  }
}
