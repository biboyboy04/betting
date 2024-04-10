import { Component, OnInit, inject, Input, SimpleChanges } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
  ],
  standalone: true,
})
export class PlayerModalComponent implements OnInit {
  constructor() {}
  @Input() type: any;
  @Input() data: any;
  playerService = inject(PlayerService);
  modalCtrl = inject(ModalController);
  
  playerData = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    balance: 0,
    nationality: '',
  };

  ngOnInit() {
    if (this.type === 'Edit') {
      this.playerData = this.data;
    }
  }

  submit() {
    if (this.type === 'Add') {
      this.playerService.add(this.playerData).subscribe((res) => {
        console.log(res);
      });
    } else if (this.type === 'Edit') {
      this.playerService.update(this.playerData).subscribe((res) => {
        console.log(res);
      });
    }
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
