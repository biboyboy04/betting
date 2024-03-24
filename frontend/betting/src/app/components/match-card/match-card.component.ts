import { Component, OnInit, Input } from '@angular/core';
import { IonCard, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
  imports: [IonCard, IonGrid, IonRow, IonCol, IonButton],
  standalone: true,
})
export class MatchCardComponent  implements OnInit {
  @Input() matchData: any;
  constructor() { }

  ngOnInit() {}

}
