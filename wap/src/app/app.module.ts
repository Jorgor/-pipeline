import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from "@angular/common/http";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
//zorro语言包

 import {CommonModule, registerLocaleData} from '@angular/common';
 import zh from '@angular/common/locales/zh';
import {WeUiModule} from "ngx-weui";
 registerLocaleData(zh);
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        RoutesModule,
        LayoutModule,
        HttpClientModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        CustomFormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        WeUiModule.forRoot(),
    ],

     providers: [],

     bootstrap: [AppComponent]
})
export class AppModule {
}
