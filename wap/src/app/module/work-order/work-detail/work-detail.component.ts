import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { WorkOrderService } from '../work-order.service';
import {WEB_URL_PREFIX} from "../../../../assets/server/http-link.data";
@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {

  status = {
    PENDING:{
      title: '待处理工单',
      btn: {
        name: '开始处理',
        event: 'btnEvent'
      }
    },
    PROCESSING:{
      title: '正在处理',
      btn: {
        name: '确定',
        event: 'btnEvent'
      }
    },
    PROCESSED:{
      title: '已处理工单',
      btn: null
    },
    REJECTED:{
      title: '已驳回工单',
      btn: {
        name: '开始处理',
        event: 'btnEvent'
      }
    },
    CLOSED:{
      title: '已关闭工单',
      btn: null
    }
  }
  activeDetail = this.status.PENDING;
  lastFeedback = null;
  detail = null;
  constructor(public location: Location) { }
  ngOnInit() {
    this.detail = WorkOrderService.prototype.detail;
    if(this.detail.feedback){
      this.lastFeedback = this.detail.feedback[this.detail.feedback.length-1]
    }
    this.activeDetail = this.status[this.detail.status];
    console.log(this.detail)
  }
  detailEvent(fnName) {
    this[fnName] && this[fnName]();
  }
  btnEvent() {
    console.log('event click')
  }
  goback() {
    this.location.back();
  }
  getImg(url){
    return `${WEB_URL_PREFIX}upload/getimg?imgurl=${url}`
  }
}
