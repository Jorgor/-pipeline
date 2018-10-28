import { Routes, RouterModule } from '@angular/router';
import { MineComponent } from './mine.component';

const routes: Routes = [
  { path: '', component: MineComponent }
];

export const MineRoutes = RouterModule.forChild(routes);
