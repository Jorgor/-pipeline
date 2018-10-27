import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderRoutingModule } from './work-order.routing';
import { WorkOrderService } from './work-order.service';
import { WorkListComponent } from './work-list/work-list.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { ShowDetailComponent } from '../show-detail/show-detail.component';

@NgModule({
  imports: [
    CommonModule,
    WorkOrderRoutingModule
  ],
  declarations: [WorkOrderComponent,
    WorkListComponent,
    WorkDetailComponent,
    ShowDetailComponent
  ],
  providers: [WorkOrderService]
})
export class WorkOrderModule { }
