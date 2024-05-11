import { Component, OnInit, inject } from '@angular/core';
import { IonTitle, IonHeader, IonContent, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonFooter, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular/standalone';
import { PlayerService } from 'src/app/services/player.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-wallet-modal',
  templateUrl: './wallet-modal.component.html',
  styleUrls: ['./wallet-modal.component.scss'],
  standalone: true,
  imports: [ CommonModule, IonIcon, IonFooter, IonButton, IonInput, IonLabel, IonItem, IonToolbar, IonContent, IonHeader, IonTitle, ]
})
export class WalletModalComponent  implements OnInit {
  toast = inject(ToastController);
  alertCtrl = inject(AlertController);
  playerService = inject(PlayerService);
  authService = inject(AuthenticationService);
  constructor() {}
  selected: any;
  userBalance = 0;

  ngOnInit() {
    this.handleSelect('Players');
    this.authService.getUser().subscribe((data:any) => {
      this.userBalance = +data.user.balance;
    })
  }

  handleSelect(selected: any) {
    this.selected = selected;
  }

  async presentDeposit() {
    const alert = await this.alertCtrl.create({
      header: 'Deposit',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Enter amount...',
          type: 'number',
        },
      ],
      buttons: [
        {
          cssClass:"cancel",
          text: 'Cancel',
          role: 'cancel',
        },
        {
          cssClass:"confirm",
          text: 'Confirm',
          handler: (alertData) => {
           this.authService.getUser().subscribe((data:any) => {
            this.playerService.deposit(data.user.player_id,alertData.amount).subscribe((data) => {
              this.userBalance+= +alertData.amount;
              this.presentSuccessToast("Deposit Success!")
            })
            
           })
          }
        }
      ]
    });

    await alert.present();
  }

  async presentWithdraw() {
    const alert = await this.alertCtrl.create({
      header: 'Withdraw',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Enter amount...',
          type: 'number',
        },
      ],
      buttons: [
        {
          cssClass:"cancel",
          text: 'Cancel',
          role: 'cancel',
        },
        {
          cssClass:"confirm",
          text: 'Confirm',
          handler: (alertData) => {
            this.authService.getUser().subscribe((data:any) => {
              this.playerService.withdraw(data.user.player_id,alertData.amount).subscribe((data) => {
                this.userBalance -= +alertData.amount;
                this.presentSuccessToast("Deposit Success!")
              })
              
             })
          }
        }
      ]
    });
    await alert.present();
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

  // handleSubmit() {
  //   switch (this.selected) {
  //     case 'Players':
  //       this.generateService.players(this.userBalance).subscribe((data) => {
  //         console.log(data);
  //       });
  //       break;
  //     case 'Matches':
  //       this.generateService.matches(this.userBalance).subscribe((data) => {
  //         console.log(data);
  //       });
  //       break;
  //     case 'Bets':
  //       this.generateService.bets(this.userBalance).subscribe((data) => {
  //         console.log(data);
  //       });
  //       break;
  //     case 'Winners':
  //       this.generateService.winners(this.userBalance).subscribe((data) => {
  //         console.log(data);
  //       });
  //       break;

  //     default:
  //       break;
  //   }
  //   this.presentSuccessToast('Successfully Generated Data');
  //   this.userBalance = null;
  // }

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
