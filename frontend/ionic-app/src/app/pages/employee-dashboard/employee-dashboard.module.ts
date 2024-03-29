import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { EmployeeDashboardPageRoutingModule } from './employee-dashboard-routing.module';

import { EmployeeDashboardPage } from './employee-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeDashboardPageRoutingModule
  ],
  declarations: [EmployeeDashboardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeeDashboardPageModule {}
