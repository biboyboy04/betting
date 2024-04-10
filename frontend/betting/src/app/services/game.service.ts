import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../interface/game';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  private endpoint = 'game'
  private domain:any;
  constructor() { 
    this.domain =  environment.domain;
  }
  
  getAll():Observable<Game[]>{
    return this.http.get<Game[]>(`${this.domain}${this.endpoint}`);
  }

  get(id:number):Observable<Game>{
    return this.http.get<Game>(`${this.domain}${this.endpoint}/byId/${id}`);
  }

  add<T>(game:any):Observable<T>{
    return this.http.post<T>(`${this.domain}${this.endpoint}`, game);
  }

  update<T>(game:any):Observable<T>{
    return this.http.put<T>(`${this.domain}${this.endpoint}`, game);
  }

  
  delete<T>(id:number):Observable<T>{
    return this.http.delete<T>(`${this.domain}${this.endpoint}/${id}`);
  }
}
