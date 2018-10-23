import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Cookie} from 'ng2-cookies';

import {BaseService} from '../../core/base.service';
import {UserService} from '../../routes/login/user.service';

import {ApiResponse} from "../../domain/api-response.domain";
import {WorkOrder } from "../../domain/workOrder.domain";

@Injectable()
export class WorkListService extends BaseService {

  constructor(http: HttpClient,
    userService: UserService) {
    super(http, userService);
  }
  getList(type):Promise<ApiResponse<Array<WorkOrder>>> {
    return this.get('my/workorder?status=' + type)
  }
}