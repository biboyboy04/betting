import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../interface/login-user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private http = inject(HttpClient);
  private endpoint = 'auth'
  private domain:any;
  private router = inject(Router);

  constructor() {
    this.domain =  environment.domain;
   }

  loginPlayer<T>(loginUser: LoginUser): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };

    return this.http.post<T>(`${this.domain}${this.endpoint}/player`, loginUser, httpOptions);
  }

  loginEmployee<T>(loginUser: LoginUser): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };

    return this.http.post<T>(
      `${this.domain}${this.endpoint}/employee`,
      loginUser,
      httpOptions
    );
  }

  getUser<T>(): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };
    return this.http.get<T>(`${this.domain}${this.endpoint}/getUser`, httpOptions);
  }

  redirectToLandingPage() {
    this.router.navigate(['/home']);
  }

   redirectLoggedUser(userDetails: any) {
    const userType = userDetails?.user?.user_type;
    let redirectRoute: string;
    switch (userType) {
      case 'player':
        redirectRoute = `/user-dashboard`;
        break;
      case 'employee':
        redirectRoute = `/employee-dashboard`;
        break;
      default:
        redirectRoute = `/home`;
        break;
    }
    if (this.router.url !== redirectRoute) {
      this.router.navigate([redirectRoute]);
    }
  }

  logout<T>(): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };

    return this.http.delete<T>(`${this.domain}${this.endpoint}/logout`, httpOptions);
  }
}
