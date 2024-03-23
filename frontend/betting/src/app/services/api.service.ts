import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  constructor() { }
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  
}
