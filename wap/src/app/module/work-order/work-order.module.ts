import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderRoutingModule } from './work-order-routing.module';
import { WorkListComponent } from './work-list/work-list.component';

@NgModule({
  imports: [
    CommonModule,
    WorkOrderRoutingModule
  ],
  declarations: [WorkOrderComponent,
    WorkListComponent
]
})
export class WorkOrderModule { }
