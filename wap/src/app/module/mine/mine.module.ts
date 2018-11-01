import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineComponent } from './mine.component';
import { MineRoutes } from './mine.routing';
import { MineService } from './mine.service';
import { LoginService } from '../../routes/login/login.service'
@NgModule({
  imports: [
    CommonModule,
    MineRoutes
  ],
  declarations: [MineComponent],
  providers: [LoginService, MineService]
})
export class MineModule { }
