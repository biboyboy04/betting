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
import { TransactionsService } from 'src/app/services/transactions.service';
import { TransactionsDetailsComponent } from '../transactions-details/transactions-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TransactionsModalComponent } from '../transactions-modal/transactions-modal.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [
    IonSelect,
    IonSelectOption,
    IonFooter,
    NgxPaginationModule,
    TransactionsDetailsComponent,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  transactionsService = inject(TransactionsService);
  isSearch = false;
  transactionData: any;
  filteredData: any;
  isModalOpen = false;
  isActionSheetOpen = false;
  isAlertOpen = false;
  modalCtrl = inject(ModalController);
  selectedPlayer: any;
  p: number = 1;
  total: any;
  selected = 'All';
  buttons = ['All', 'Deposit', 'Withdraw', 'Bet', 'Win Bet'];

  ngOnInit() {
    addIcons({ search, add, closeOutline });
    this.transactionsService.getAll(this.p, 25).subscribe((data) => {
      this.transactionData = data;
      this.filteredData = data;
      console.log(data);
    });
    this.transactionsService.getTotal().subscribe((data: any) => {
      this.total = data[0].total;
      console.log(data);
    });
  }

  handleSelect(index: number) {
    this.selected = this.buttons[index];
    let type = 'deposit';
    switch (index) {
      case 0:
        this.transactionsService.getAll(this.p, 25).subscribe((data) => {
          this.transactionData = data;
          this.filteredData = data;
          console.log(data);
        });
        this.transactionsService.getTotal().subscribe((data: any) => {
          this.total = data[0].total;
          console.log(data);
        });
        break;
      case 1:
        type = 'deposit';
        this.transactionsService
          .getAllFiltered(type, this.p, 25)
          .subscribe((data) => {
            this.transactionData = data;
            this.filteredData = data;
            console.log(data);
          });
        this.transactionsService
          .getTotalFiltered(type)
          .subscribe((data: any) => {
            this.total = data[0].total;
            console.log(data);
          });
        break;
      case 2:
        type = 'withdraw';
        this.transactionsService
          .getAllFiltered(type, this.p, 25)
          .subscribe((data) => {
            this.transactionData = data;
            this.filteredData = data;
            console.log(data);
          });
        this.transactionsService
          .getTotalFiltered(type)
          .subscribe((data: any) => {
            this.total = data[0].total;
            console.log(data);
          });
        break;
      case 3:
        type = 'bet';
        this.transactionsService
          .getAllFiltered(type, this.p, 25)
          .subscribe((data) => {
            this.transactionData = data;
            this.filteredData = data;
            console.log(data);
          });
        this.transactionsService
          .getTotalFiltered(type)
          .subscribe((data: any) => {
            this.total = data[0].total;
            console.log(data);
          });
        break;
      case 4:
        type = 'win_bet';
        this.transactionsService
          .getAllFiltered(type, this.p, 25)
          .subscribe((data) => {
            this.transactionData = data;
            this.filteredData = data;
            console.log(data);
          });
        this.transactionsService
          .getTotalFiltered(type)
          .subscribe((data: any) => {
            this.total = data[0].total;
            console.log(data);
          });
        break;

      default:
        break;
    }
  }

  toggleSearch(isSearch: boolean) {
    this.isSearch = isSearch;
  }

  handleInput(event: any) {
    const searchValue = event.detail.value.toLowerCase();
    if (!searchValue) {
      this.filteredData = this.transactionData;
    } else {
      this.filteredData = this.transactionData.filter((transaction: any) => {
        return transaction.player_id.toString().includes(searchValue);
      });
    }
  }

  async showPlayerModal(type: any, data?: any) {
    const modal = await this.modalCtrl.create({
      component: TransactionsModalComponent,
      componentProps: {
        type: type,
        data: data,
      },
    });
    await modal.present();
  }

  deletePlayer(transactionData: any) {
    this.transactionsService.delete(transactionData.player_id).subscribe((res) => {
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
    this.selectedPlayer = event;
  }

  handlePageChange(page: any) {
    this.p = page;
    this.transactionsService.getAll(page, 25).subscribe((data) => {
      this.transactionData = data;
      this.filteredData = data;
    });
  }

  public actionSheetButtons = [
    
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
        this.deletePlayer(this.selectedPlayer);
      },
    },
  ];
}
