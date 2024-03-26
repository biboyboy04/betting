import { Component, OnInit } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton, IonItem } from "@ionic/angular/standalone";
import { MatchCardComponent } from '../match-card/match-card.component';
@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
  imports: [IonItem, MatchCardComponent, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton],
  standalone: true
})
export class WelcomeScreenComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
