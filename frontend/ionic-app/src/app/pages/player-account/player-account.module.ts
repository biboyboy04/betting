import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerAccountPageRoutingModule } from './player-account-routing.module';

import { PlayerAccountPage } from './player-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerAccountPageRoutingModule
  ],
  declarations: [PlayerAccountPage]
})
export class PlayerAccountPageModule {}
