import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { UserRedirectService } from 'src/app/services/user-redirect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  age!: number;
  username!: string;
  password!: string;
  selectedUserType!: string;
  loginError: boolean = false;
  errorMessage!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userRedirectService: UserRedirectService
  ) {}

  ngOnInit() {
    // getUserDetails
    // i think this is refactorable???
    // make sure that checkUserTypeQueryParam is called after getAndRedirectUser

    this.apiService
      .getUser()
      .then((userDetails: any) => {
        this.userRedirectService.redirectLoggedUser(userDetails);
      })
      .catch((error) => {
        console.error('Error retrieving user details:', error);
      });

    this.checkUserTypeQueryParam();
  }

  checkUserTypeQueryParam() {
    //Refactorable??
    // If there's no userType query parameter, redirect to landing page
    if (!this.route.snapshot.queryParams['userType']) {
      this.router.navigate(['/landing']);
    }
    this.selectedUserType = this.route.snapshot.queryParams['userType'];
  }

  // refactr to admin?
  login() {
    if (!this.username && !this.password) {
      console.log('Invalid credentials. Please enter a username and password.');
      return;
    } else {
      this.apiService
        .login(this.selectedUserType, this.username, this.password)
        .then((response) => {
          console.log(response, 'LOGIN PAGE');

          // Clear form fields
          this.username = '';
          this.password = '';
          // Reset error state
          this.loginError = false;
          this.errorMessage = '';

          // refactorable
          this.router.navigate([`/${this.selectedUserType}-dashboard`]);
        })
        .catch((error) => {
          this.loginError = true;
          this.errorMessage = error.message;
          console.log(error);
        })
        .finally(() => {});
    }
  }
}
