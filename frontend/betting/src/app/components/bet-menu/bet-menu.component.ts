import { Component, OnInit, inject, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonInput,
  ModalController,
  IonIcon,
  IonMenu,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol,
  MenuController,
  IonCard,
  IonCardContent,
  IonLabel
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
import { chevronForwardCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { PlayerService } from 'src/app/services/player.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BetService } from 'src/app/services/bet.service'; 
import { MatchService } from 'src/app/services/match.service';
@Component({
  selector: 'app-bet-menu',
  templateUrl: './bet-menu.component.html',
  styleUrls: ['./bet-menu.component.scss'],
  imports: [
    IonCardContent,
    IonCard,
    IonMenu,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
    IonSegment,
    IonSegmentButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel
  ],
  standalone: true,
})
export class BetMenuComponent implements OnInit {
  @Input() matchData: any;
  private menuCtrl = inject(MenuController);
  toast = inject(ToastController)
  authService = inject(AuthenticationService);
  matchService = inject(MatchService);
  playerService = inject(PlayerService);
  betService = inject(BetService);
  betAmount: number = 0;
  selectedSegment = "slip"
  playerMatches:any = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.matchData = changes['matchData'].currentValue;
    this.betAmount = 0;
    console.log(this.matchData);
  }

  ngOnInit() {
    addIcons({ chevronForwardCircle });
    this.authService.getUser().subscribe((data:any) => {
      this.matchService.getByPlayer(data.user.player_id).subscribe((data) => {
        this.playerMatches = data;
        console.log(data);
      })
    }) 
    console.log(this.matchData, "m,asd datas");
  }

  closeBetMenu() {
    this.menuCtrl.close('bet-menu');
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

  async presentErrorToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }
 
  bet(){
  this.authService.getUser().subscribe((data:any) => { 
    this.playerService.bet(data.user.player_id, this.betAmount).subscribe((data) => {
      console.log(data, "data bet");
    })

    let selectedTeamID = this.matchData.selectedTeam === "team1" ? this.matchData.team1.team_id : this.matchData.team2.team_id;
    let newBet = {
      player_id: data.user.player_id,
      match_id: this.matchData.match_id,
      amount: this.betAmount,
      bet_on_team_id: selectedTeamID
    }
    this.betService.add(newBet).subscribe((data) => {
      console.log(data);
    })
  }, (error) => {
    this.presentErrorToast(error);
  }, () => {
    this.closeBetMenu();
    this.presentSuccessToast("Bet Successful");
  })}
}
