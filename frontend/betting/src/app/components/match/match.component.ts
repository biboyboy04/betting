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
import { MatchModalComponent } from '../match-modal/match-modal.component';
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
  selectedType = "All";
  buttons = ['All', 'Pending', 'Finished'];

  ngOnInit() {
    addIcons({ search, add, closeOutline });
    this.matchService.getAll("all",this.p, 25).subscribe((data) => {
      this.betData = data;
      this.filteredData = data;
      console.log(data);
    });
    this.matchService.getTotal().subscribe((data: any) => {
      this.total = data[0].total;
      console.log(data);
    });
  }


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
      component: MatchModalComponent,
      componentProps: {
        type: type,
        data: data,
      },
    });
    await modal.present();
  }

  handleSelect(index: number) {
    this.selectedType = this.buttons[index];
    this.matchService.getAll(this.selectedType.toLowerCase(), this.p, 25).subscribe((data) => {
      this.betData = data;
      this.filteredData = data;
    })
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
    this.matchService.getAll(this.selectedType.toLowerCase(),page, 25).subscribe((data:any) => {
      this.betData = data;
      this.filteredData = data;
    });
  }

  public actionSheetButtonsFinished = [
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

  public actionSheetButtonsPending = [
    {
      text: 'Set Winner',
      handler: () => {
        this.showPlayerModal('Win', this.selectedBet);
      },
      data: {
        action: 'edit',
      },
    },
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
