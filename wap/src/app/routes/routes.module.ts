import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {routes} from './routes';
import {CoreModule} from "../core/core.module";
import {LayoutModule} from "../layout/layout.module";
import {PublicComponentsModule} from "../public/public-components.module";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
import {FindPwdComponent} from "./login/find-pwd/find-pwd.component";
import {FindPwdService} from "./login/find-pwd/find-pwd.service";
import {UserService} from "./login/user.service";
import {WeUiModule} from "ngx-weui";
import { TabComponent } from './tab/tab.component';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FormsModule,
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        LayoutModule,
        PublicComponentsModule,
        WeUiModule
    ],
    declarations: [
        LoginComponent,
        FindPwdComponent,
    TabComponent
],
    exports: [
        RouterModule,
    ],
    providers: [
        LoginService,
        FindPwdService,
        UserService
    ]
})

export class RoutesModule {

    constructor() {
    }

}
