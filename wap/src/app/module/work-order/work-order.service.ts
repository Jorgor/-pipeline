import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Cookie} from 'ng2-cookies';

import {BaseService} from '../../core/base.service';
import {UserService} from '../../routes/login/user.service';

import {ApiResponse} from "../../domain/api-response.domain";
import {WorkOrderStatus} from "../../domain/workOrderStatus.domain";

@Injectable()
export class WorkOrderService extends BaseService {

  constructor(http: HttpClient,
    userService: UserService) {
    super(http, userService);
  }
  getCount():Promise<ApiResponse<Array<WorkOrderStatus>>> {
    return this.get('my/workorder/count')
  }
}
