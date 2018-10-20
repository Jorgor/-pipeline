import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderRoutingModule } from './work-order-routing.module';
import { WorkOrderService } from './work-order.service';
import { WorkListService } from './work-list.service';
import { WorkListComponent } from './work-list/work-list.component';

@NgModule({
  imports: [
    CommonModule,
    WorkOrderRoutingModule
  ],
  declarations: [WorkOrderComponent,
    WorkListComponent],
  providers: [WorkOrderService,WorkListService]
})
export class WorkOrderModule { }
