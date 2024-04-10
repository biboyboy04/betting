import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadComponent: () => import('../components/games/games.component').then( m => m.GamesComponent)
  },
  {
    path: 'players',
    loadComponent: () => import('../components/players/players.component').then( m => m.PlayersComponent)
  },
  {
    path: 'teams',
    loadComponent: () => import('../components/teams/teams.component').then( m => m.TeamsComponent)
  },
  {
    path: 'generate',
    loadComponent: () => import('../components/generate/generate.component').then( m => m.GenerateComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('../components/transactions/transactions.component').then( m => m.TransactionsComponent)
  },
  {
    path: 'bet',
    loadComponent: () => import('../components/bet/bet.component').then( m => m.BetComponent)
  },
  {
    path: 'match',
    loadComponent: () => import('../components/match/match.component').then( m => m.MatchComponent)
  },
];
