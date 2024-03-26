import { Component, OnInit } from '@angular/core';
import { IonCard, IonButton, IonCardContent, IonIcon } from "@ionic/angular/standalone";
import { chevronForwardOutline, chevronForwardCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
  imports: [IonCard, IonButton, IonCardContent, IonIcon],
  standalone: true
})
export class MatchDetailsComponent  implements OnInit {

  constructor() {
    addIcons({chevronForwardOutline, chevronForwardCircleOutline});
   }

  ngOnInit() {}

}
