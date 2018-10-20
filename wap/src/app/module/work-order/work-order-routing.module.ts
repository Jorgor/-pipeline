import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkOrderComponent } from './work-order.component';
import { WorkListComponent } from './work-list/work-list.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderComponent
  },
  {
    path: 'work-list',
    component: WorkListComponent    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
