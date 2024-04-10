import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private http = inject(HttpClient);
  private endpoint = 'bet'
  private domain:any;
  constructor() {
    this.domain =  environment.domain;
   }

  add<T>(newBet: any): Observable<T> {
    return this.http.post<T>(`${this.domain}${this.endpoint}`, newBet);
  }

  get<T>(id:number):Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/${id}`);
  }

  getAll<T>(page:number, limit:number):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}?page=${page}&limit=${limit}`);
  }

  getAllWithMatch<T>():Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/match`);
  }

  getAllFiltered<T>(type:any, page:number, limit:number):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}/${type}?page=${page}&limit=${limit}`);
  }

  getTotal<T>():Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}/total`);
  }

  getTotalFiltered<T>(type:any):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}/total/${type}`);
  }


  update<T>(newBet: any):Observable<T> {
    return this.http.put<T>(`${this.domain}${this.endpoint}`, newBet)  ;
  }

  delete<T>(id:number):Observable<T> {
    return this.http.delete<T>(`${this.domain}${this.endpoint}/${id}`);
  }
}
