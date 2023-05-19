import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    SellerDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
