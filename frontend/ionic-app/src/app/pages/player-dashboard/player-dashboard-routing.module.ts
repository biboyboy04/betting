import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerAccountPage } from '../player-account/player-account.page';

import { PlayerDashboardPage } from './player-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerDashboardPage
  },
  {
    path: 'player-account',
    loadChildren: () =>
    import('../player-account/player-account.page').then((m) => m.PlayerAccountPage),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerDashboardPageRoutingModule {}
