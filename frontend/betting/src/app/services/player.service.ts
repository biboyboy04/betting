import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewPlayer } from '../interface/new-player';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private http = inject(HttpClient);
  private endpoint = 'player'
  private domain:any;
  constructor() {
    this.domain =  environment.domain;
   }


  add<T>(newPlayer: any): Observable<T> {
    return this.http.post<T>(`${this.domain}${this.endpoint}`, newPlayer);
  }

  get<T>(id:number):Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/${id}`);
  }

  getAll<T>(page:number, limit:number):Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}?page=${page}&limit=${limit}`);
  }

  getTotal<T>():Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}/total`);
  }

  update<T>(newPlayer: any):Observable<T> {
    return this.http.put<T>(`${this.domain}${this.endpoint}/${newPlayer.player_id}`, newPlayer)  ;
  }

  delete<T>(id:number):Observable<T> {
    return this.http.delete<T>(`${this.domain}${this.endpoint}/${id}`);
  }
}
