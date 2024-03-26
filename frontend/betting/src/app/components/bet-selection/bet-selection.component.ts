import { Component, OnInit } from '@angular/core';
import { IonIcon, IonContent, IonGrid, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton } from "@ionic/angular/standalone";
import { MatchDetailsComponent } from '../match-details/match-details.component';
@Component({
  selector: 'app-bet-selection',
  templateUrl: './bet-selection.component.html',
  styleUrls: ['./bet-selection.component.scss'],
  standalone: true,
  imports: [MatchDetailsComponent, IonIcon, IonButton, IonCardTitle, IonCardHeader, IonContent, IonGrid, IonCard, IonCardContent]
})
export class BetSelectionComponent  implements OnInit {

  constructor() {
    
   }

  ngOnInit() {}

}
