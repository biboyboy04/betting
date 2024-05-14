import { Component, OnInit, inject } from '@angular/core';
import { IonTextarea, IonLabel, IonButton, IonIcon, IonSearchbar, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonItem, IonInput, IonActionSheet, IonAlert, IonRefresherContent, IonRefresher } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, add, closeOutline} from 'ionicons/icons';
import { GameDetailsComponent } from '../game-details/game-details.component';
import { ModalController } from '@ionic/angular/standalone';
import { TeamDetailsComponent } from '../team-details/team-details.component';
import { TeamModalComponent } from '../team-modal/team-modal.component';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  imports: [TeamDetailsComponent, IonTextarea, IonLabel, IonButton, IonIcon, IonSearchbar, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonItem, IonInput, IonActionSheet, IonAlert, IonRefresherContent, IonRefresher],
  standalone: true,
})
export class TeamsComponent  implements OnInit {

  constructor() { }
  teamService = inject(TeamService)
  isSearch = false;
  teamData : any;
  filteredData: any;
  isModalOpen = false;
  isActionSheetOpen = false;
  isAlertOpen = false;
  modalCtrl = inject(ModalController);
  selectedTeam:any;

  ngOnInit() {
    addIcons({search, add, closeOutline});
    this.teamService.getAll().subscribe((data) => {
      this.teamData = data;
      this.filteredData = data;
    })
  }

  toggleSearch(isSearch:boolean) {
    this.isSearch = isSearch;
  }

  handleInput(event: any) {
    const searchValue = event.detail.value.toLowerCase();
    this.filteredData = this.teamData.filter((team:any) => {
      return team.name.toLowerCase().includes(searchValue)
    })
  }

  async showTeamModal(type: any, data?: any) {
    const modal = await this.modalCtrl.create({
      component: TeamModalComponent,
      componentProps: {
        type: type,
        data: data,
      },
    });
    await modal.present();
  }

  deleteTeam(teamData: any) {
    this.teamService.delete(teamData.team_id).subscribe((res) => {
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
    this.selectedTeam = event;
  }

  public actionSheetButtons = [
    {
      text: 'Edit',
      handler: () => {
        this.showTeamModal('Edit', this.selectedTeam);
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
        this.deleteTeam(this.selectedTeam);
      },
    },
  ];

}
