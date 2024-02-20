import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  username: string = '';
  password: string = '';

  login() {
    // You can implement your authentication logic here, for simplicity, let's just check if the username and password are not empty
    if (this.username && this.password) {
      // Successful login, navigate to home page
      this.router.navigate(['/login']);
    } else {
      // Failed login, show error message or handle accordingly
      console.log('Invalid credentials. Please enter a username and password.');
    }
  }
}
