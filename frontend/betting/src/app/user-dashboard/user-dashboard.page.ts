import { Component, OnInit, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonSegment,
  IonSegmentButton,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonCard,
  IonCardContent,
  IonLabel,
  IonContent,
  IonPopover,
  IonMenuButton,
  IonIcon,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol, IonInput, IonFooter } from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WelcomeScreenComponent } from '../components/welcome-screen/welcome-screen.component';
import { AuthenticationService } from '../services/authentication.service';
import { MatchService } from 'src/app/services/match.service';
import { OddsService } from 'src/app/services/odds.service';
import { GameService } from 'src/app/services/game.service';
import { TeamService } from 'src/app/services/team.service';
import {
  search,
  person,
  chevronForwardCircleOutline,
  chevronForwardOutline,
  chevronForwardCircle,
  wallet,
  logOut
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { BetSelectionComponent } from '../components/bet-selection/bet-selection.component';
import { Game } from '../interface/game';
import { Match } from '../interface/match';
import { MenuController } from '@ionic/angular/standalone';
import { BetMenuComponent } from '../components/bet-menu/bet-menu.component';
import { ModalController } from '@ionic/angular/standalone';
import { WalletModalComponent } from '../components/wallet-modal/wallet-modal.component';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
  standalone: true,
  imports: [ 
    IonFooter, 
    IonInput, 
    IonGrid,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonApp,
    IonRouterOutlet,
    CommonModule,
    FormsModule,
    WelcomeScreenComponent,
    BetSelectionComponent,
    BetMenuComponent,
    IonSegment,
    IonSegmentButton,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonCard,
    IonCardContent,
    IonLabel,
    IonContent,
    IonPopover,
    IonMenuButton,
    IonIcon,
    IonRow,
    IonCol,
  ],
  providers: [MenuController]
})
export class UserDashboardPage implements OnInit {
  authService = inject(AuthenticationService);
  matchService = inject(MatchService);
  oddsService = inject(OddsService);
  gameService = inject(GameService);
  teamService = inject(TeamService);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  // private menuCtrl = inject(MenuController);
  isWelcomeScreen = true;
  isOpen = false;
  gameData: Game[] = [];
  matchDetails: Match[] = [];
  groupedMatches: any[] = [];
  filteredMatches: any[] = [];
  selectedGame: number | null = null;

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    addIcons({
      search,
      person,
      chevronForwardCircleOutline,
      chevronForwardCircle,
      wallet,
      logOut
    });
  
    this.authService.getUser().subscribe((data:any) => {
      this.authService.redirectLoggedUser(data);
     
    }, (err) => {
      this.authService.redirectToLandingPage();
    })

    this.fetchGames();
    this.fetchMatches();
  }

  async showModal(){
    const modal = await this.modalCtrl.create({
      component: WalletModalComponent,
    });
    await modal.present();
  }

  fetchGames() {
    this.gameService.getAll().subscribe((data: Game[]) => {
      this.gameData = data;
    });
  }

  async fetchMatches() {
    const totalData : any = await this.matchService.getTotal().toPromise();
    this.matchService.getAll("pending", 1, totalData[0].total).subscribe((data:any) => {
      console.log(data, "data fetech matches");
      // store orig data
      this.matchDetails = data;
      // store grouped data by date
      // for filtering basis
      this.groupedMatches = this.groupMatchesByDate(data);
      // changeable storage for filtering 
      this.filteredMatches = this.groupedMatches;
    });
  }

  logout(){
    this.authService.logout().subscribe((data) => {
      console.log(data);
      this.router.navigate(['/home']);
    })
  }


  openBetMenu() {
    this.menuCtrl.open('bet-menu');
  }

  closeBetMenu() {
    this.menuCtrl.close('bet-menu');
  }

  openGameMenu() {
    this.menuCtrl.open('game-menu');
  }

  // refactorable?

  // Add a default parameter value -1 so that there is an option
  // to show all the matches as the common index is a positive number
  // so filterMatches() = do not filter
  // filterMatches(1) = filter by game id 1

  // filterMatches is attached to games button click event
  // so when a game button is clicked, the page should show the
  // betting screen then filter the game by game id

  filterMatches(gameId: number): void {
    this.showWelcomeScreen(false);
    this.selectedGame = gameId;

    // no filter = all games
    // so return the grouped matches which is the unfiltered
    if (gameId === -1) {
      this.filteredMatches = this.groupedMatches;
      return;
    }

    this.filteredMatches = this.groupedMatches.map((group) => {
      return {
        date: group.date,
        matches: group.matches.filter((match: any) => match.game_id === gameId),
      };
    });
    console.log( this.filteredMatches, "asdasd")
  }

  // map for linear get and search
  // O(n) time complexity hehez
  groupMatchesByDate(matches: Match[]) {
    let dateMap = new Map();
    let groupedMatches = [];

    for (const match of matches) {
      // get month and day in words from numerical date
      // March 29 from 2024-3-29
      const date = new Date(match.match_date_time).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      });

      if (!dateMap.has(date)) {
        dateMap.set(date, [match]);
      } else {
        dateMap.get(date).push(match);
      }
    }

    // This is to format the set to an array of objects
    // so that the data format is consistent
    for (const [date, matches] of dateMap) {
      groupedMatches.push({ date, matches });
    }

    return groupedMatches;
  }

  showWelcomeScreen(isShow: boolean): void {
    // selected game to null so that there's no highliughted card
    // in the sidebar  as the currently selected is
    // not the betting screen
    this.selectedGame = null;
    this.isWelcomeScreen = isShow;
  }
}
