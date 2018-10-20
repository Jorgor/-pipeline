import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderRoutingModule } from './work-order-routing.module';
import { WorkOrderService } from './work-order.service';
import { WorkListComponent } from './work-list/work-list.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';

@NgModule({
  imports: [
    CommonModule,
    WorkOrderRoutingModule
  ],
  declarations: [WorkOrderComponent,
    WorkListComponent,
    WorkDetailComponent
],
  providers: [WorkOrderService]
})
export class WorkOrderModule { }
