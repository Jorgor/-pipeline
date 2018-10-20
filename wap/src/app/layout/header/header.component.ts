import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LoginService} from '../../routes/login/login.service';
import {SettingsService} from '../../core/settings/settings.service';
import {UserService} from '../../routes/login/user.service';

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public loginservice: LoginService,
                public settings: SettingsService) {

        // this.newsService.countUnreadNewsNumber().then((res) => {
        //     this.settings.unreadNewsNumber = res.data.data;
        // });
    }

    logout() {
        this.loginservice.logout();
    }

    ngOnInit() {

    }


}
