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
import { GameService } from 'src/app/services/game.service';
@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
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
export class GameModalComponent implements OnInit {
  constructor() {}
  @Input() type: any;
  @Input() data: any;
  gameService = inject(GameService);
  gameData = {
    name: '',
    description: '',
    genre: '',
    platform: '',
  };
  modalCtrl = inject(ModalController);

  ngOnInit() {
    if (this.type === 'Edit') {
      this.gameData = this.data;
    }
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }
  submit() {
    if(this.type === "Add") {
      this.gameService.add(this.gameData).subscribe((res) => {
        console.log(res)
      })
    }
    else if(this.type === "Edit") {
      this.gameService.update(this.gameData).subscribe((res) => {
        console.log(res)
      })
    }
    this.dismiss();
  }
}
