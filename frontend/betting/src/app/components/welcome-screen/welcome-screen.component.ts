import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton, IonItem } from "@ionic/angular/standalone";
import { MatchCardComponent } from '../match-card/match-card.component';
import { MatchService } from 'src/app/services/match.service';
@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
  imports: [IonItem, MatchCardComponent, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton],
  standalone: true
})
export class WelcomeScreenComponent  implements OnInit {
  matchService = inject(MatchService);
  matchData:any = {};
  constructor() {
   }

  ngOnInit() {
    //refactor why limit 5 is not wokring here
    this.matchService.getAll("pending", 1, 5).subscribe((data:any) => {
      this.matchData = data.slice(0, 5);
    })
  }

}
