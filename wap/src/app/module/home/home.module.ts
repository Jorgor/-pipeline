import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { HomeRoutes } from './home.routing';
import { HomeService } from './home.service';
import { WorkOrderService } from '../work-order/work-order.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes
  ],
  declarations: [HomeComponent],
  providers: [HomeService, WorkOrderService]
})
export class HomeModule { }
