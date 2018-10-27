import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineComponent } from './mine.component';
import { MineRoutes } from './mine.routing';
import { MineService } from './mine.service';
@NgModule({
  imports: [
    CommonModule,
    MineRoutes
  ],
  declarations: [MineComponent],
  providers: [MineService]
})
export class MineModule { }
