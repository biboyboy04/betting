import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor() {}
  ngOnInit() {}
  signup() {
    // Implement your sign up logic here
    console.log(
      'Sign up successful. Username:',
      this.username,
      'Email:',
      this.email
    );
  }
}
