import { Component, OnInit, inject } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { IonTextarea, IonLabel, IonButton, IonIcon, IonSearchbar, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonItem, IonInput, IonActionSheet, IonAlert, IonRefresherContent, IonRefresher } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, add, closeOutline} from 'ionicons/icons';
import {  ReactiveFormsModule } from '@angular/forms';
import { GameDetailsComponent } from '../game-details/game-details.component';
import { ModalController } from '@ionic/angular/standalone';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { AlertController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  imports: [IonRefresher, IonRefresherContent, IonAlert, IonActionSheet, IonTextarea, IonInput, IonLabel, IonHeader, IonModal, ReactiveFormsModule,IonButton, IonIcon, IonSearchbar, GameDetailsComponent, IonToolbar, IonTitle, IonButtons, IonContent, IonItem ],
  standalone: true,
})
export class GamesComponent  implements OnInit {

  constructor() { }
  gameService = inject(GameService)
  isSearch = false;
  gameData : any;
  filteredData: any;
  isModalOpen = false;
  isActionSheetOpen = false;
  isAlertOpen = false;
  modalCtrl = inject(ModalController);
  selectedGame:any;

  ngOnInit() {
    addIcons({search, add, closeOutline});
    this.gameService.getAll().subscribe((data) => {
      this.gameData = data;
      this.filteredData = data;
    });
  }

  async showGameModal(type: any, data?:any) {
    const modal = await this.modalCtrl.create({
      component: GameModalComponent,
      componentProps: {
        type: type,
        data: data
      }
    })
    await modal.present();
  }

  deleteGame(gameData:any){
    this.gameService.delete(gameData.game_id).subscribe((res) => {
      console.log(res)
    })
  }

  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setActionSheetOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  toggleActionSheet(event: Event){
    this.setActionSheetOpen(true);
    console.log(event);
    this.selectedGame = event;
  }

  // can be refactored for a much efficient filteruing
  handleInput(event: any) {
    const searchValue = event.detail.value.toLowerCase();
    this.filteredData = this.gameData.filter((game:any) => {
      return game.name.toLowerCase().includes(searchValue)
    })
  }

  toggleSearch() {
    this.isSearch = !this.isSearch;
  }

  public actionSheetButtons = [
    {
      text: 'Edit',
      handler: () => {
        this.showGameModal("Edit", this.selectedGame);
      },
      data: {
        action: 'edit',
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
        this.deleteGame(this.selectedGame);
      },
    },
  ];

}
