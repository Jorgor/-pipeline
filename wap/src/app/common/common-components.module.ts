import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreModule } from "../core/core.module";

// 跨项目通用组件模块
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        CoreModule,
        FormsModule,
    ],
    providers: [],
    declarations: [
    ],
    exports: [
    ]
})
export class CommonComponentsModule {
}
