import { Component, OnInit, inject, Input, SimpleChanges } from '@angular/core';
import {
  IonSelectOption,
  IonSelect,
  IonMenu,
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
  IonAvatar,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { MenuController } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-game-modal',
  templateUrl: './transactions-modal.component.html',
  styleUrls: ['./transactions-modal.component.scss'],
  imports: [
    IonSelectOption,
    IonSelect,
    IonSearchbar,
    IonRow,
    IonCol,
    IonGrid,
    IonLabel,
    IonAvatar,
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
    IonMenu,
  ],
  standalone: true,
})
export class TransactionsModalComponent implements OnInit {
  constructor() {}
  @Input() type: any;
  @Input() data: any;
  gameService = inject(GameService);
  playerService = inject(PlayerService);
  playerData: any;
  filteredData: any;
  transactionData = {
    playerID: '',
    type: '',
    amount: '',
  };
  modalCtrl = inject(ModalController);
  menuCtrl = inject(MenuController);
  toastCtrl = inject(ToastController);

  ngOnInit() {
    if (this.type === 'Edit') {
      this.transactionData = this.data;
    }
    this.playerService.getTotal().subscribe((data: any) => {
      this.playerService.getAll(1, data[0].total).subscribe((data: any) => {
        this.playerData = data;
        this.filteredData = data;
      });
    });
  }

  customPopoverOptions: any = {
    cssClass: 'popover-wide',
  };

  handleInput(event: any) {
    const searchValue = event.detail.value;
    if (!searchValue) {
      this.filteredData = this.playerData;
    } else {
      this.filteredData = this.playerData.filter((data: any) => {
        return data.player_id.toString().includes(searchValue);
      });
    }
  }

  handlePlayerClick(player_id: any) {
    this.transactionData.playerID = player_id;
    this.menuCtrl.close('transaction-menu');
  }

  showMenu(id: string) {
    this.menuCtrl.open(id);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  submit() {
    if (this.type === 'Add') {
      const {playerID, type, amount} = this.transactionData;
      switch (type) {
        case 'withdraw':
          this.playerService.withdraw(playerID, +amount).subscribe((data) => {
            this.presentSuccessToast("Withdraw Success");
          })
          break;
        case 'deposit':
          this.playerService.deposit(playerID, +amount).subscribe((data) => {
            this.presentSuccessToast("Deposit Success");
          })
          break;
        case 'bet':
          this.playerService.bet(playerID, +amount).subscribe((data) => {
            this.presentSuccessToast("Bet Success");
          })
          break;
        case 'win-bet':
          this.playerService.winBet(playerID, +amount).subscribe((data) => {
            this.presentSuccessToast("Win Bet Success");
          })
          break;
        default:
          break;
      }
      this.dismiss();
    } else if (this.type === 'Edit') {
      // this.gameService.update(this.transactionData).subscribe((res) => {
      //   console.log(res)
      // })
    }
    this.dismiss();
  }
}
