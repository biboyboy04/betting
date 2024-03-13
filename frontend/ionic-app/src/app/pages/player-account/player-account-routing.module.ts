import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerAccountPage } from './player-account.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerAccountPageRoutingModule {}
