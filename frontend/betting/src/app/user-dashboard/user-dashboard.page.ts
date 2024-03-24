import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchCardComponent } from '../components/match-card/match-card.component';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MatchCardComponent]
})
export class UserDashboardPage implements OnInit {
  isOpen = false;

  gameData: any;
  matchData: any;

  constructor() { }

  ngOnInit() {
  }



}

