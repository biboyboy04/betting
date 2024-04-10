import { Component, OnInit, inject } from '@angular/core';
import {
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonLabel,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonItem,
  IonInput,
  IonActionSheet,
  IonAlert,
  IonRefresherContent,
  IonRefresher,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, add, closeOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular/standalone';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatchDetailsComponent } from '../match-details/match-details.component';
import { MatchService } from 'src/app/services/match.service';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  standalone: true,
  imports: [
    MatchDetailsComponent,
    IonSelect,
    IonSelectOption,
    IonFooter,
    NgxPaginationModule,
    IonTextarea,
    IonLabel,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonItem,
    IonInput,
    IonActionSheet,
    IonAlert,
    IonRefresherContent,
    IonRefresher,
  ],
})
export class MatchComponent  implements OnInit {


  constructor() { }
  matchService = inject(MatchService);
  isSearch = false;
  betData: any;
  filteredData: any;
  isModalOpen = false;
  isActionSheetOpen = false;
  isAlertOpen = false;
  modalCtrl = inject(ModalController);
  selectedBet: any;
  p: number = 1;
  total: any;
  // selected = 'All';
  // buttons = ['All', 'Deposit', 'Withdraw', 'Bet', 'Win Bet'];

  ngOnInit() {
    addIcons({ search, add, closeOutline });
    this.matchService.getAllDetails(this.p, 25).subscribe((data) => {
      this.betData = data;
      this.filteredData = data;
      console.log(data);
    });
    this.matchService.getTotal().subscribe((data: any) => {
      this.total = data[0].total;
      console.log(data);
    });
  }

  // handleSelect(index: number) {
  //   this.selected = this.buttons[index];
  //   let type = 'deposit';
  //   switch (index) {
  //     case 0:
  //       this.matchService.getAll(this.p, 25).subscribe((data) => {
  //         this.betData = data;
  //         this.filteredData = data;
  //         console.log(data);
  //       });
  //       this.matchService.getTotal().subscribe((data: any) => {
  //         this.total = data[0].total;
  //         console.log(data);
  //       });
  //       break;
  //     case 1:
  //       type = 'deposit';
  //       this.matchService
  //         .getAllFiltered(type, this.p, 25)
  //         .subscribe((data) => {
  //           this.betData = data;
  //           this.filteredData = data;
  //           console.log(data);
  //         });
  //       this.matchService
  //         .getTotalFiltered(type)
  //         .subscribe((data: any) => {
  //           this.total = data[0].total;
  //           console.log(data);
  //         });
  //       break;
  //     case 2:
  //       type = 'withdraw';
  //       this.matchService
  //         .getAllFiltered(type, this.p, 25)
  //         .subscribe((data) => {
  //           this.betData = data;
  //           this.filteredData = data;
  //           console.log(data);
  //         });
  //       this.matchService
  //         .getTotalFiltered(type)
  //         .subscribe((data: any) => {
  //           this.total = data[0].total;
  //           console.log(data);
  //         });
  //       break;
  //     case 3:
  //       type = 'bet';
  //       this.matchService
  //         .getAllFiltered(type, this.p, 25)
  //         .subscribe((data) => {
  //           this.betData = data;
  //           this.filteredData = data;
  //           console.log(data);
  //         });
  //       this.matchService
  //         .getTotalFiltered(type)
  //         .subscribe((data: any) => {
  //           this.total = data[0].total;
  //           console.log(data);
  //         });
  //       break;
  //     case 4:
  //       type = 'win_bet';
  //       this.matchService
  //         .getAllFiltered(type, this.p, 25)
  //         .subscribe((data) => {
  //           this.betData = data;
  //           this.filteredData = data;
  //           console.log(data);
  //         });
  //       this.matchService
  //         .getTotalFiltered(type)
  //         .subscribe((data: any) => {
  //           this.total = data[0].total;
  //           console.log(data);
  //         });
  //       break;

  //     default:
  //       break;
  //   }
  // }

  toggleSearch(isSearch: boolean) {
    this.isSearch = isSearch;
  }

  handleInput(event: any) {
    const searchValue = event.detail.value.toLowerCase();
    if (!searchValue) {
      this.filteredData = this.betData;
    } else {
      this.filteredData = this.betData.filter((transaction: any) => {
        return transaction.player_id.toString().includes(searchValue);
      });
    }
  }

  async showPlayerModal(type: any, data?: any) {
    const modal = await this.modalCtrl.create({
      component: PlayerModalComponent,
      componentProps: {
        type: type,
        data: data,
      },
    });
    await modal.present();
  }

  deletePlayer(betData: any) {
    this.matchService.delete(betData.player_id).subscribe((res) => {
      console.log(res);
    });
  }

  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setActionSheetOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  toggleActionSheet(event: Event) {
    this.setActionSheetOpen(true);
    this.selectedBet = event;
  }

  handlePageChange(page: any) {
    this.p = page;
    this.matchService.getAllDetails(page, 25).subscribe((data) => {
      this.betData = data;
      this.filteredData = data;
    });
  }

  public actionSheetButtons = [
    {
      text: 'Edit',
      handler: () => {
        this.showPlayerModal('Edit', this.selectedBet);
      },
      data: {
        action: 'edit',
      },
    },
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
      handler: () => {
        this.setAlertOpen(true);
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        this.deletePlayer(this.selectedBet);
      },
    },
  ];
}
