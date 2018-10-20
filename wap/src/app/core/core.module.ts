import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { PrivillegeService } from "./privillege.service";
import { UserService } from "../routes/login/user.service";

@NgModule({
    imports: [
    ],
    providers: [
        SettingsService,
        PrivillegeService,
        UserService
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
    constructor( ) {

    }
}
