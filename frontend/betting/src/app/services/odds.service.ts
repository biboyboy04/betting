
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OddsService {
  private http = inject(HttpClient);
  private endpoint = 'odds'
  private domain:any;
  constructor() {
    this.domain =  environment.domain;
   }

  getOddsByMatch<T>(matchId:number):Observable<T>{
    return this.http.get<T>(`${this.domain}${this.endpoint}/byMatchId/${matchId}`);
  }
}
