import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private http = inject(HttpClient);
  private endpoint = 'transaction'
  private domain:any;
  constructor() {
    this.domain =  environment.domain;
    console.log(`${this.domain}${this.endpoint}`)
   }
  add<T>(newTransaction: any): Observable<T> {
    return this.http.post<T>(`${this.domain}${this.endpoint}`, newTransaction);
  }

  get<T>(id:number):Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/${id}`);
  }

  getAll<T>(page:number, limit:number):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}?page=${page}&limit=${limit}`);
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


  update<T>(newTransaction: any):Observable<T> {
    return this.http.put<T>(`${this.domain}${this.endpoint}`, newTransaction)  ;
  }

  delete<T>(id:number):Observable<T> {
    return this.http.delete<T>(`${this.domain}${this.endpoint}/${id}`);
  }
}
