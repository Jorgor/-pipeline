import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {CoreModule} from '../core/core.module';
import {PaginationModule} from 'ngx-bootstrap/index';
import {AmapComponent} from './amap/amap.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {ZTreeComponent} from './zTree/zTree.component';
import {UserService} from '../routes/login/user.service';

// 项目内公用组件模块
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        CoreModule,
        FormsModule,
        PaginationModule.forRoot(),
    ],
    providers: [
        UserService
    ],
    declarations: [
        AmapComponent,
        PaginatorComponent,
        ZTreeComponent,],

    exports: [
        AmapComponent,
        PaginatorComponent,
        ZTreeComponent,]
})
export class PublicComponentsModule {
}
