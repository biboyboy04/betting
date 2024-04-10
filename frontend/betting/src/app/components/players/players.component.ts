import { Component, OnInit, inject } from '@angular/core';
import {
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
  IonRefresher, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, add, closeOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular/standalone';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerDetailsComponent } from '../player-details/player-details.component';

import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  standalone: true,
  imports: [IonFooter, 
    NgxPaginationModule,
    PlayerDetailsComponent,
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
export class PlayersComponent implements OnInit {
  constructor() {}
  playerService = inject(PlayerService);
  isSearch = false;
  playerData: any;
  filteredData: any;
  isModalOpen = false;
  isActionSheetOpen = false;
  isAlertOpen = false;
  modalCtrl = inject(ModalController);
  selectedPlayer: any;
  p: number = 1;
  total:any;

  ngOnInit() {
    addIcons({ search, add, closeOutline });
    this.playerService.getAll(this.p, 25).subscribe((data) => {
      this.playerData = data;
      this.filteredData = data;
    });
    this.playerService.getTotal().subscribe((data:any) => {
      this.total = data[0].total;
    })
  }

  toggleSearch(isSearch: boolean) {
    this.isSearch = isSearch;
  }

  handleInput(event: any) {
    const searchValue = event.detail.value.toLowerCase();
    if (!searchValue) {
      this.filteredData = this.playerData;
    } else {
      this.filteredData = this.playerData.filter((player: any) => {
        return player.username.toLowerCase().includes(searchValue);
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

  deletePlayer(playerData: any) {
    this.playerService.delete(playerData.player_id).subscribe((res) => {
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

  handlePageChange(page:any){
    this.p = page;
    this.playerService.getAll(page, 25).subscribe((data) => {
      this.playerData = data;
      this.filteredData = data;
    });
  }

  public actionSheetButtons = [
    {
      text: 'Edit',
      handler: () => {
        this.showPlayerModal('Edit', this.selectedPlayer);
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
        console.log(this.selectedPlayer, "selected player")
        this.deletePlayer(this.selectedPlayer);
      },
    },
  ];
}
