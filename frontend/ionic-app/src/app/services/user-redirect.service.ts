import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserRedirectService {
  constructor(private router: Router) {}

  // redirecting the user if they are already logged in
  // use case: login page, landing page, different dashboard page
  redirectToLandingPage() {
    this.router.navigate(['/landing']);
  }

  redirectLoggedUser(userDetails: any) {
    const userType = userDetails?.user?.user_type;
    let redirectRoute: string;
    switch (userType) {
      case 'player':
        redirectRoute = `/player-dashboard`;
        break;
      case 'employee':
        redirectRoute = `/employee-dashboard`;
        break;
      default:
        redirectRoute = `/landing`;
        break;
    }
    if (this.router.url !== redirectRoute) {
      this.router.navigate([redirectRoute]);
    }
  }
}
