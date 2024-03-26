import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchCardComponent } from '../components/match-card/match-card.component';
import { WelcomeScreenComponent } from '../components/welcome-screen/welcome-screen.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonicModule,
    CommonModule,
    FormsModule,
    WelcomeScreenComponent,
  ],
})
export class UserDashboardPage implements OnInit {
  isOpen = false;

  gameData: any;
  matchData: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToValorant() {
    console.log('Valorant');
    this.router.navigate(['user-dashboard', 'welcome-screen']);
  }

  navigateToValorant2() {
    console.log('Valorant');
    this.router.navigate(['user-dashboard', 'bet-selection']);
  }
}
