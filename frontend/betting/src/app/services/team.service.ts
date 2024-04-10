import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private http = inject(HttpClient);
  private endpoint = 'team'
  private domain:any;
  constructor() {
    this.domain =  environment.domain;
   }

  add<T>(name:any):Observable<T>{
    return this.http.post<T>(`${this.domain}${this.endpoint}`, {name});
  }

  get<T>(id:number):Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/${id}`);
  }

  getAll<T>():Observable<T> {
    return this.http.get<T>(`${this.domain}${this.endpoint}`);
  }

  update<T>(newTeam:any):Observable<T>{
    return this.http.put<T>(`${this.domain}${this.endpoint}`, newTeam);
  }

  delete<T>(id:number):Observable<T>{
    console.log(id, "delet")
    return this.http.delete<T>(`${this.domain}${this.endpoint}/${id}`);
  }

}