import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderRoutingModule } from './work-order.routing';
import { WorkOrderService } from './work-order.service';
import { WorkListComponent } from './work-list/work-list.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkResolveComponent } from './work-resolve/work-resolve.component';
import { WorkMapComponent } from './work-map/work-map.component';
import { PublicComponentsModule } from '../../public/public-components.module';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    WorkOrderRoutingModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    PublicComponentsModule
  ],
  declarations: [WorkOrderComponent,
    WorkListComponent,
    WorkDetailComponent,
    WorkResolveComponent,
    WorkMapComponent
  ],
  providers: [WorkOrderService]
})
export class WorkOrderModule { }
