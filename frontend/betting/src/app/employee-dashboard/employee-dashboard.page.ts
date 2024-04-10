import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {  RouterLink } from '@angular/router';
import { GameDetailsComponent } from '../components/game-details/game-details.component';
import {
closeOutline,
analytics,
cash,
person,
dice,
gameController,
card,
chatbubbleEllipses,
people,
add,
search,
colorWand
} from 'ionicons/icons';
import { MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.page.html',
  styleUrls: ['./employee-dashboard.page.scss'],
  standalone: true,
  imports: [ RouterLink, IonicModule, CommonModule, FormsModule, GameDetailsComponent]
})
export class EmployeeDashboardPage implements OnInit {

  constructor() { }
  selected: string = 'Analytics';
  menuCtrl = inject(MenuController);
  
  ngOnInit() {
    addIcons({colorWand, search, add, closeOutline, people, analytics, cash, person, dice, gameController, card, chatbubbleEllipses});
  
  }
  selectRoute(selected: string) {
    this.selected = selected;
  }

  closeMenu() {
    this.menuCtrl.close('admin-menu');
  }

  routes = [
    // {
    //   title: 'Analytics',
    //   url: '/employee-dashboard/analytics',
    //   icon: 'analytics'
    // },
    {
      title: "Generate",
      url: '/employee-dashboard/generate',
      icon: 'color-wand'
    },
    {
      title: 'Players',
      url: '/employee-dashboard/players',
      icon: 'person'
    },
    {
      title: 'Games',
      url: '/employee-dashboard/games',
      icon: 'game-controller'
    },
    {
      title: 'Teams',
      url: '/employee-dashboard/teams',
      icon: 'people'
    },
    {
      title: 'Matches',
      url: '/employee-dashboard/match',
      icon: 'cash'
    },
    {
      title: 'Bets',
      url: '/employee-dashboard/bet',
      icon: 'dice'
    },
    {
      title: 'Transactions',
      url: '/employee-dashboard/transactions',
      icon: 'card'
    },
    // {
    //   title: 'Customer Support',
    //   url: '/employee-dashboard/customer-support',
    //   icon: 'chatbubble-ellipses'
    // }

  ]
}
