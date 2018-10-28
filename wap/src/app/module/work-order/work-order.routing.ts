import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkOrderComponent } from './work-order.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkListComponent } from './work-list/work-list.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderComponent
  },
  {
    path: 'detail',
    component: WorkDetailComponent
  },
  {
    path: 'work-list/:status',
    component: WorkListComponent    
  }
];

export const WorkOrderRoutingModule  = RouterModule.forChild(routes);
