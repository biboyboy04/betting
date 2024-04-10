import { Component, OnInit, inject, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonInput,
  ModalController,
  IonIcon,
  IonMenu,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol,
  MenuController,
  ToastController,
  IonCard,
  IonCardContent,
  IonLabel
} from '@ionic/angular/standalone';
import { chevronForwardCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-bet-menu',
  templateUrl: './bet-menu.component.html',
  styleUrls: ['./bet-menu.component.scss'],
  imports: [
    IonCardContent,
    IonCard,
    IonMenu,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
    IonSegment,
    IonSegmentButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel
  ],
  standalone: true,
})
export class BetMenuComponent implements OnInit {
  @Input() matchData: any;
  private menuCtrl = inject(MenuController);
  betAmount: number = 0.00;
  selectedSegment = "slip"
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.matchData = changes['matchData'].currentValue;
    console.log(this.matchData)
  }

  ngOnInit() {
    addIcons({ chevronForwardCircle });
    console.log(this.matchData, "asdhiasuidhas")
  }

  closeBetMenu() {
    this.menuCtrl.close('bet-menu');
  }
}
