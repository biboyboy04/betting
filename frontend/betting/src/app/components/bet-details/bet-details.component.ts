import { Component, OnInit, Input, inject, Output, EventEmitter } from '@angular/core';
import { IonAlert, IonMenuButton, IonMenu,IonCard, IonCardHeader, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonLabel, IonItem, IonContent, IonFooter, IonTitle, IonHeader, IonToolbar, IonButtons, IonModal, IonInput, IonTextarea, IonAvatar } from '@ionic/angular/standalone'
import {ellipsisHorizontal, createOutline, close, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-bet-details',
  templateUrl: './bet-details.component.html',
  styleUrls: ['./bet-details.component.scss'],
  imports: [IonAvatar, IonAlert, IonTextarea, IonInput, IonModal, IonMenuButton, IonButtons, IonMenu,IonToolbar, IonHeader, IonTitle, IonFooter, IonContent, IonItem, IonLabel, IonButton, IonIcon, IonCard, IonCardHeader, IonGrid, IonCol, IonRow],
  standalone: true,
})
export class BetDetailsComponent  implements OnInit {
  @Input() betData: any;  
  @Output() toggleActionSheet = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    addIcons({ellipsisHorizontal, createOutline, close, trash});
  }
  
  handleClicked(){
    this.toggleActionSheet.emit(this.betData);
  }


}
