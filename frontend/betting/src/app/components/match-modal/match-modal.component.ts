import { Component, OnInit, inject, Input, SimpleChanges } from '@angular/core';
import {
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
  IonLabel,
  IonDatetime,
  IonRadioGroup,
  IonRadio,
  IonListHeader,
  IonList,
  IonAvatar,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';
import { CommonModule } from '@angular/common';
import { GameService } from 'src/app/services/game.service';
import { TeamService } from 'src/app/services/team.service';
import { MenuController } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-match-modal',
  templateUrl: './match-modal.component.html',
  styleUrls: ['./match-modal.component.scss'],
  imports: [
    IonAvatar,
    IonList,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
    IonDatetime,
    IonLabel,
    FormsModule,
    CommonModule,
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
export class MatchModalComponent implements OnInit {
  constructor() {}
  @Input() type: any;
  @Input() data: any;
  matchService = inject(MatchService);
  gameService = inject(GameService);
  teamService = inject(TeamService);
  modalCtrl = inject(ModalController);
  menuCtrl = inject(MenuController);
  toastCtrl = inject(ToastController);

  gameData: any;
  teamData: any;
  newDateTime = '';
  selectedWinner = 0;

  newMatch = {
    game_id: null,
    game_name: null,
    team1_id: null,
    team1_name: null,
    team2_id: null,
    team2_name: null,
    match_date_time: null,
    winning_id: null,
  };

  submit() {
    const { game_id, team1_id, team2_id, match_date_time } = this.newMatch;
    this.matchService
      .add({
        game_id,
        team1_id,
        team2_id,
        match_date_time,
        winning_id: null,
      })
      .subscribe((data) => {
        console.log(data);
        this.presentSuccessToast("Match Added Successfully");
        this.dismiss();
      },(err) => {
        console.log(err);
      }, () => {

      });
  }



  ngOnInit() {
    // if (this.type === 'Edit') {
    //   this.playerData = this.data;
    // }
    this.selectedWinner = this.data?.team1.team_id;

    this.gameService.getAll().subscribe((data) => {
      this.gameData = data;
    });

    this.teamService.getAll().subscribe((data) => {
      this.teamData = data;
    });
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



  handleGameClick(id: any, name: any) {
    this.newMatch.game_id = id;
    this.newMatch.game_name = name;
    this.menuCtrl.close('game-menu');
  }

  handleTeam1Click(id: any, name: any) {
    this.newMatch.team1_id = id;
    this.newMatch.team1_name = name;
    this.menuCtrl.close('team1-menu');
  }

  handleTeam2Click(id: any, name: any) {
    this.newMatch.team2_id = id;
    this.newMatch.team2_name = name;
    this.menuCtrl.close('team2-menu');
  }

  showMenu(id: string) {
    this.menuCtrl.open(id);
  }

  updateMatchDate() {
    // override origin values to prevent reloading and see the changesi nstantly
    this.data.match_date_time = this.newDateTime.replace('T', ' ');
    this.matchService
      .updateDate(this.data.match_id, this.data.match_date_time)
      .subscribe((data) => {
        console.log(data);
      });

    this.modalCtrl.dismiss();
  }

  setWinner() {
    this.matchService
      .setWinner(this.data.match_id, this.selectedWinner)
      .subscribe((data) => {
        console.log(data);
      });
    this.modalCtrl.dismiss();
  }

  // submit() {
  //   if (this.type === 'Add') {
  //     this.matchService.add(this.playerData).subscribe((res) => {
  //       console.log(res);
  //     });
  //   } else if (this.type === 'Edit') {
  //     this.matchService.update(this.playerData).subscribe((res) => {
  //       console.log(res);
  //     });
  //   }
  //   this.dismiss();
  // }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
