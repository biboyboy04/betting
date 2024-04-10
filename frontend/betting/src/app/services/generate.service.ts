import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {
  private http = inject(HttpClient);
  private endpoint = 'generate'
  private domain:any;
  constructor() {
    this.domain =  environment.domain;
   }

  matches<T>(number: number):Observable<T>{
    return this.http.post<T>(`${this.domain}${this.endpoint}/matches`, {number_of_matches: number})
  }

  players<T>(number: number):Observable<T>{
    return this.http.post<T>(`${this.domain}${this.endpoint}/players`, {number_of_players: number})
  }

  bets<T>(number: number):Observable<T>{
    return this.http.post<T>(`${this.domain}${this.endpoint}/bets`, {number_of_bets: number})
  }

  winners<T>(number: number):Observable<T>{
    return this.http.put<T>(`${this.domain}${this.endpoint}/winners`, {number_of_winner: number})
  }

}
