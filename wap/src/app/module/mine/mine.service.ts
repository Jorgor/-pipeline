import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';

import {BaseService} from '../../core/base.service';
import {UserService} from '../../routes/login/user.service';

import {User} from "../../domain/user.domain";
import {ApiResponse} from "../../domain/api-response.domain";
@Injectable()
export class MineService extends BaseService {

constructor(private user: UserService, http: HttpClient, private router: Router)   { 
    super(http, user)
  }
  getUserInfo(): User {
    return this.user.user
  }
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      try{
        Cookie.deleteAll();
        if (Cookie.check(UserService.globalCookieUser)) {
            resolve({success: true});
        } else {
            this.router.navigate(['/login']);
        }
      }catch (err) {
        reject({success:false, ...err});
      }
    })
  }
}
