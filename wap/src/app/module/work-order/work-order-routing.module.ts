import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkOrderComponent } from './work-order.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderComponent
  },
  {
    path: 'detail/:status',
    component: WorkDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
