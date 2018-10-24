import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Cookie} from 'ng2-cookies';

import {BaseService} from '../../core/base.service';
import {UserService} from '../../routes/login/user.service';


import {ApiResponse} from "../../domain/api-response.domain";
@Injectable()
export class HomeService extends BaseService {

  constructor(http: HttpClient,
    userService: UserService) {
    super(http, userService);
  }

  getPending():Promise<ApiResponse<Array<any>>> {
    return this.get('my/workorder/count?status=PENDING')
  }

  getResloveing():Promise<ApiResponse<Array<any>>> {
    return this.get('my/workorder/doing')
  }

}


