import { Component, OnInit, inject } from '@angular/core';
import {
  IonTabButton,
  IonTabs,
  IonTabBar,
  IonIcon,
  IonButton,
  IonInput,
  IonContent,
  IonLabel,
  IonItem,
  IonTitle,
  IonToolbar,
  IonFooter,
} from '@ionic/angular/standalone';
import { GenerateService } from 'src/app/services/generate.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  trophyOutline,
  cashOutline,
  personOutline,
  diceOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
  imports: [
    CommonModule,
    IonFooter,
    IonToolbar,
    IonTitle,
    FormsModule,
    IonItem,
    IonLabel,
    IonContent,
    IonInput,
    IonButton,
    IonTabButton,
    IonTabs,
    IonTabBar,
    IonIcon,
  ],
  standalone: true,
})
export class GenerateComponent implements OnInit {
  toast = inject(ToastController);
  generateService = inject(GenerateService);
  constructor() {}
  selected: any;
  numberOfData: any;

  ngOnInit() {
    this.handleSelect('Players');
    addIcons({ cashOutline, personOutline, diceOutline, trophyOutline });
  }

  handleSelect(selected: any) {
    this.selected = selected;
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  handleSubmit() {
    switch (this.selected) {
      case 'Players':
        this.generateService.players(this.numberOfData).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'Matches':
        this.generateService.matches(this.numberOfData).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'Bets':
        this.generateService.bets(this.numberOfData).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'Winners':
        this.generateService.winners(this.numberOfData).subscribe((data) => {
          console.log(data);
        });
        break;

      default:
        break;
    }
    this.presentSuccessToast('Successfully Generated Data');
    this.numberOfData = null;
  }

  buttons = [
    {
      title: 'Players',
      icon: 'person-outline',
    },
    {
      title: 'Matches',
      icon: 'cash-outline',
    },
    {
      title: 'Bets',
      icon: 'dice-outline',
    },
    {
      title: 'Winners',
      icon: 'trophy-outline',
    },
  ];
}
