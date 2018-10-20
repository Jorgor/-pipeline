import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FileUploadModule} from 'ng2-file-upload';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {CoreModule} from '../core/core.module';
import {SettingsService} from '../core/settings/settings.service';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        CoreModule,
        FormsModule,
        FileUploadModule,
        PaginationModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [SettingsService],
    declarations: [
        FooterComponent,
        HeaderComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class LayoutModule {
}
