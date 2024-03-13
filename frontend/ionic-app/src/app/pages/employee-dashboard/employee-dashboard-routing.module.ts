import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDashboardPage } from './employee-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardPage,
    children: [
      {
        path: 'players',
        loadChildren: () => import('./pages/players/players.module').then( m => m.PlayersPageModule)
      },
      {
        path: 'update/:id',
        loadChildren: () => import('./pages/update/update.module').then( m => m.UpdatePageModule)
      },
    ]
  },
  {
    path: 'bets',
    loadChildren: () => import('./pages/bets/bets.module').then( m => m.BetsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDashboardPageRoutingModule {}
