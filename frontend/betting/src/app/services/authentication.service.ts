import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5555';

  loginPlayer<T>(username: any, password: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/player/login`,
     {
      username,
      password,
    });
  }
  
  loginEmployee<T>(username: any, password: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/employee/login`,
     {
      username,
      password,
    });
  }

  signupPlayer<T>(playerDetails: any):Observable<T>{
    return this.http.post<T>(`${this.baseUrl}/player`, playerDetails);
  }


}
