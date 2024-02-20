import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string = '';

  constructor() {}

  ngOnInit() {}

  resetPassword() {
    // Implement your password reset logic here
    console.log('Password reset email sent to: ', this.email);
  }
}
