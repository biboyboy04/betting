import { Component, OnInit, inject, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  IonCard,
  IonButton,
  IonCardContent,
  IonIcon, IonContent } from '@ionic/angular/standalone';
import {
  chevronForwardOutline,
  chevronForwardCircleOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-match-card-details',
  templateUrl: './match-card-details.component.html',
  styleUrls: ['./match-card-details.component.scss'],
  imports: [IonContent, IonCard, IonButton, IonCardContent, IonIcon],
  standalone: true,
})
export class MatchCardDetailsComponent  implements OnInit {
  @Input() matchDetail: any;
  @Output() dataEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    addIcons({ chevronForwardOutline, chevronForwardCircleOutline });
    console.log(this.matchDetail.team1.name)
  }

  sendDataToParent(){
    console.log("clicked")
    this.dataEvent.emit(this.matchDetail);
  }

  getTime12HourFormat(dateTime: any) {
    // Get the time from the date time
    const time = dateTime.split(' ')[1];
    // Get the hour from the time
    let hour = parseInt(time.split(':')[0]);
    if (hour > 12) {
      hour -= 12;
      return hour + ' PM';
    }
    return hour + ' AM';
  }

}
