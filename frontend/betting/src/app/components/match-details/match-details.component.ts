import { Component, OnInit, Input, inject, Output, EventEmitter } from '@angular/core';
import { IonAlert, IonMenuButton, IonMenu,IonCard, IonCardHeader, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonLabel, IonItem, IonContent, IonFooter, IonTitle, IonHeader, IonToolbar, IonButtons, IonModal, IonInput, IonTextarea } from '@ionic/angular/standalone'
import {ellipsisHorizontal, createOutline, close, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
  imports: [IonAlert, IonTextarea, IonInput, IonModal, IonMenuButton, IonButtons, IonMenu,IonToolbar, IonHeader, IonTitle, IonFooter, IonContent, IonItem, IonLabel, IonButton, IonIcon, IonCard, IonCardHeader, IonGrid, IonCol, IonRow],
  standalone: true
})
export class MatchDetailsComponent implements OnInit {
  @Input() matchData: any;  
  @Output() toggleActionSheet = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    addIcons({ellipsisHorizontal, createOutline, close, trash});
  }

  handleClicked(){
    this.toggleActionSheet.emit(this.matchData);
  }

}
