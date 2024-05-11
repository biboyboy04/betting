

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

  add<T>(newMatch:any):Observable<T> {
    return this.http.post<T>(`${this.domain}${this.endpoint}`, newMatch);
  }

  getAll<T>(type:string,page:number, limit:number):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}?status=${type}&page=${page}&limit=${limit}`);
  }

  getByPlayer<T>(id:number):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}/${id}/player`);
  }


  getTotal<T>():Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/total`);
  }
  getTotalPending<T>():Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/total`);
  }


  setWinner<T>(id:any, winner_id:any):Observable<T>{
    return this.http.put<T>(`${this.domain}${this.endpoint}/${id}/winner`, {winner_id});
  }

  updateDate<T>(id:any, newDate:any):Observable<T>{
    return this.http.put<T>(`${this.domain}${this.endpoint}/${id}/date`, {match_date_time: newDate});
  }

  delete<T>(id:any):Observable<T>{
    return this.http.delete<T>(`${this.domain}${this.endpoint}/${id}`);
  }

}
