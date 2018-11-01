import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Cookie} from 'ng2-cookies';

import {BaseService} from '../../core/base.service';
import {UserService} from '../../routes/login/user.service';

import {ApiResponse} from "../../domain/api-response.domain";
import {WorkOrderStatus} from "../../domain/workOrderStatus.domain";
import {WorkOrder } from "../../domain/workOrder.domain";

@Injectable()
export class WorkOrderService extends BaseService {
  private detail_data: any;
  constructor(http: HttpClient,
    userService: UserService) {
    super(http, userService);
  }
  getCount():Promise<ApiResponse<Array<WorkOrderStatus>>> {
    return this.get('my/workorder/count')
  }
  getList(type):Promise<ApiResponse<Array<WorkOrder>>> {
    return this.get('my/workorder?status='+type)
  }
  saveDetail(data):Promise<ApiResponse<Array<WorkOrder>>>{
    sessionStorage.setItem('detail_data', JSON.stringify(data))
    return  this.detail_data = data;
  }
  claimOrder(id):Promise<ApiResponse<boolean>>{
    return this.put(`/workorder/${id}/receive`, {id})
  }
  resloveOrder(id,data):Promise<ApiResponse<boolean>>{
    return this.post(`/workorder/${id}/feedback`, data)
  }
  postPoint(id,data):Promise<ApiResponse<boolean>>{
    return this.post(`/workorder/patrolworkorder/${id}/coordinate`, data)
  }
  public get detail(): any {
    if(sessionStorage.getItem('detail_data')) this.detail_data = JSON.parse(sessionStorage.getItem('detail_data'));
    return this.detail_data
  }
}
