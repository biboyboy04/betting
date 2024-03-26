import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bet-selection',
    pathMatch: 'full',
  },
  {
    path: 'welcome-screen',
    loadComponent: () => import('../components/welcome-screen/welcome-screen.component').then( m => m.WelcomeScreenComponent)
  },
  {
    path: 'bet-selection',
    loadComponent: () => import('../components/bet-selection/bet-selection.component').then( m => m.BetSelectionComponent)
  },
];
