import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { UserRedirectService } from 'src/app/services/user-redirect.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.page.html',
  styleUrls: ['./employee-dashboard.page.scss'],
})
export class EmployeeDashboardPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userRedirectService: UserRedirectService
  ) {}

  playerData: any;
  matchData: any;
  betData: any;
  winnerData: any;
  numPlayers?: number;
  numMatches?: number;
  numBets?: number;

  

  ngOnInit() {
    this.apiService
      .getUser()
      .then((userDetails: any) => {
        this.userRedirectService.redirectLoggedUser(userDetails);
      })
      .catch((error) => {
        this.userRedirectService.redirectToLandingPage();
        console.error('Error retrieving user details:', error);
      }); 

    this.apiService.getAll("player").then((players: any) => {
      this.playerData = players;
      console.log("Players: ", players);
    });

    this.apiService.getAll("match/pending").then((match: any) => {
      this.matchData = match;
      console.log("Matches: ", match);
    });

    this.apiService.getAll("bet").then((bet: any) => {
      this.betData = bet;
      console.log("Bets: ", bet);
    });

    this.apiService.getAll("match/finished").then((winners: any) => {
      this.winnerData = winners;
      console.log("Winners: ", winners);
    });
  }

  generatePlayers() {
    this.apiService.getById("generate/player", this.numPlayers).then((players: any) => {
      console.log("Generated Players: ", players);
    });
  }
  
  generateMatches() {
    this.apiService.getById("generate/match", this.numMatches).then((match: any) => {
      console.log("Generated Matches: ", match);
    });
  }

  generateBets() {
    this.apiService.getById("generate/bet", this.numBets).then((bet: any) => {
      console.log("Generated Bets: ", bet);
    });
  }

  generateWinners() {
    this.apiService.getAll("generate/winner").then((winners: any) => {
      console.log("Generated Winners: ", winners);
    });
  }
}
