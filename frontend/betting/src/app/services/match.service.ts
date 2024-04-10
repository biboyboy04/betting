

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../interface/match';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private http = inject(HttpClient);
  private endpoint = 'match'
  private domain:any;
  constructor() {
    this.domain =  environment.domain;
   }

  getPending<T>():Observable<Match[]>{
    return this.http.get<Match[]>(`${this.domain}${this.endpoint}/pending`);
  }

  getAllDetails<T>(page:number, limit:number):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}?page=${page}&limit=${limit}`);
  }

  getTotal<T>():Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/total`);
  }

  delete<T>(id:any):Observable<T>{
    return this.http.delete<T>(`${this.domain}${this.endpoint}/${id}`);
  }

}
