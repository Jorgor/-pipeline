import {Component, Injectable} from "@angular/core";
import {User} from "../../domain/user.domain";
import {Cookie} from "ng2-cookies";

@Injectable()
export class UserService {

    private _user: User = new User();
    public static globalCookieUser: string = 'marioWapUserGlobal';
    public static loginCookieUser: string = 'marioWapUser';
    public static globalCookieToken: string = 'marioWapToken';
    public static globalCookieRoleArr: string = 'marioWapRole';

    private _role: any;
    private _token: any;

    public get user(): User {
        if (Cookie.check(UserService.globalCookieUser)) this._user = JSON.parse(Cookie.get(UserService.globalCookieUser))
        return this._user;
    }
    public get token(): string {
        if (Cookie.check(UserService.globalCookieToken)) this._token = Cookie.get(UserService.globalCookieToken)
        return this._token;
    }
    public get role(): any {
        if (Cookie.check(UserService.globalCookieRoleArr)) this._role = JSON.parse(Cookie.get(UserService.globalCookieRoleArr))
        return this._role;
    }
}
