import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Cookie} from 'ng2-cookies';

import {BaseService} from '../../core/base.service';
import {UserService} from './user.service';
import {LoginResponse} from "../../domain/login-response.domain";
import {ApiResponse} from "../../domain/api-response.domain";
import {User} from "../../domain/user.domain";


declare const $: any;
declare const layer: any;

@Injectable()
export class LoginService extends BaseService implements CanActivate {

    constructor(private router: Router,
                http: HttpClient,
                userService: UserService,
                // private roleService: RoleService
    ) {
        super(http, userService);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkLogin();
    }

    Login(data: any): Promise<ApiResponse<LoginResponse>> {
        this.deleteCookie();
        return this.post('auth/login', data).then(res => {
            layer.msg(res.msg);
            if (res.success) {
                this.createCookie(res);
                this.saveLoginInfo(data);
                this.router.navigate(['/map']);
            }
            return res;
        });
    }
    public saveLoginInfo(data) {
        if (data.remember) {
            Cookie.set(UserService.loginCookieUser, JSON.stringify(data));
        } else {
            Cookie.check(UserService.loginCookieUser) ? Cookie.delete(UserService.loginCookieUser) : "";
        }
    }
    private createCookie(res) {
        this.userDetected(res.data.user);
        this.tokenDetected(res.data.token);
    }

    private deleteCookie() {
        Cookie.delete(UserService.globalCookieUser);
        Cookie.delete(UserService.globalCookieToken);
    }

    checkLogin(): Observable<boolean> | Promise<boolean> | boolean {
        if (Cookie.check(UserService.globalCookieUser)) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    private tokenDetected(token: string) {
        Cookie.set(UserService.globalCookieToken, token);
    }

    private userDetected(user: User) {
        Cookie.set(UserService.globalCookieUser, JSON.stringify(user));
    }

    private roleDetected(value: any) {
        Cookie.set(UserService.globalCookieRoleArr, JSON.stringify(value));
    }

    logout() {
        this.deleteCookie();
        this.router.navigate(['/login']);
    }

}
