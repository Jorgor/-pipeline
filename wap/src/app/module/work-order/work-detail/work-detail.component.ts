import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { WorkOrderService } from '../work-order.service';
import {WEB_URL_PREFIX} from "../../../../assets/server/http-link.data";

declare const layer: any;

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {

  status = {
    PENDING:{
      title: '待处理工单',
      btn: [{
        name: '开始处理',
        event: 'getOrder'
      }]
    },
    PROCESSING:{
      title: '正在处理',
      btn: []
    },
    PROCESSED:{
      title: '已处理工单',
      btn: []
    },
    REJECTED:{
      title: '已驳回工单',
      btn: [{
        name: '上报位置',
        event: 'btnEvent'
      },{
        name: '处理完成',
        event: 'btnEvent'
      }]
    },
    CLOSED:{
      title: '已关闭工单',
      btn: []
    }
  }
  activeDetail = this.status.PENDING;
  lastFeedback = null;
  detail = null;
  showLoading: boolean = false;
  constructor(public location: Location,private router: Router, private serve: WorkOrderService) { }
  ngOnInit() {
    this.detail = WorkOrderService.prototype.detail;
    if(this.detail.feedback){
      this.lastFeedback = this.detail.feedback[this.detail.feedback.length-1]
    }
    this.activeDetail = this.status[this.detail.status];
  }
  detailEvent(fnName) {
    this[fnName] && this[fnName]();
  }
  btnEvent() {
    console.log('event click')
  }
  getOrder() {
    this.showLoading = layer.load();
    this.serve.claimOrder(this.detail.id).then(res => {
      layer.close(this.showLoading);
      this.showLoading = false;
      if(res.success){
        this.router.navigate(['/home'])
      }
      layer.msg(res.msg)
    }, err => {
      layer.close(this.showLoading);
      this.showLoading = false;
      layer.msg('网络错误')
    })
  }
  goback() {
    this.location.back();
  }
  getImg(url){
    return `${WEB_URL_PREFIX}upload/getimg?imgurl=${url}`
  }
}
