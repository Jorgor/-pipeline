import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {LoginService} from "./login.service";
import {Cookie} from "ng2-cookies";
import {UserService} from "./user.service";
import {User} from "../../domain/user.domain";

declare const layer: any;
declare const $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    valForm: FormGroup;
    user: User = new User();

    constructor(private loginService: LoginService, private userService: UserService, private router: Router) {
        let user = Cookie.check(UserService.loginCookieUser) ? JSON.parse(Cookie.get(UserService.loginCookieUser)) : {};
        let phoneReg = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\\d{8}$";
        this.valForm = new FormGroup({
            'mobile': new FormControl(user.mobile ? user.mobile : '', [Validators.required, Validators.pattern(phoneReg)]),
            'password': new FormControl(user.password ? user.password : '', [Validators.required]),
            'remember': new FormControl(user.remember ? user.remember : false)
        });
    }

    submitForm($ev, form: any) {
        $ev.preventDefault();
        if (!form.valid) {
            layer.msg('请将信息填写完整！');
        } else {
            this.loginService.Login(form.value).then(res => {
                if (res.success) {

                }
            });
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
