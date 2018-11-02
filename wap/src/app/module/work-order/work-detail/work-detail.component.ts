import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { WorkOrderService } from '../work-order.service';
import {WEB_URL_PREFIX} from '../../../../assets/server/http-link.data';

declare const layer: any;

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {

  status = {
    PENDING: {
      title: '待处理工单',
      btn: [{
        name: '开始处理',
        event: 'getOrder'
      }]
    },
    PROCESSING:{
      title: '正在处理',
      btn: [{
        name: '上报位置',
        event: 'report'
      },{
        name: '处理完成',
        event: 'feedback'
      }]
    },
    PROCESSED: {
      title: '已处理工单',
      btn: []
    },
    REJECTED: {
      title: '已驳回工单',
      btn: [{
        name: '上报位置',
        event: 'report'
      }, {
        name: '处理完成',
        event: 'feedback'
      }]
    },
    CLOSED: {
      title: '已关闭工单',
      btn: []
    }
  }
  activeDetail = this.status.PENDING;
  lastFeedback = null;
  detail = null;
  showLoading: Boolean = false;
  reportLoading: Boolean = false;
  constructor(public location: Location, private router: Router, private serve: WorkOrderService) { }
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
  report() {
    const {id} = this.detail;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        const {longitude, latitude} = position.coords;
        this.reportLoading = layer.load();
        this.serve.postPoint(id, {longitude, latitude}).then(res => {
            layer.close(this.reportLoading);
            this.reportLoading = false;
            layer.msg(res.msg)
          })
        }, (e) => {
         // const msg = e.code;
         const dd = e.message;
         layer.msg(dd);
      });
    }else {
      layer.msg('请打开手机GPS')
    }
  }
  feedback() {
    const {id} = this.detail;
    this.router.navigate([`/home/work-order/resolve/${id}`]);
  }
  getOrder() {
    this.showLoading = layer.load();
    this.serve.claimOrder(this.detail.id).then(res => {
      layer.close(this.showLoading);
      this.showLoading = false;
      if(res.success){
        this.router.navigate(['/home'])
      }
      layer.msg(res.msg);
    }, err => {
      layer.close(this.showLoading);
      this.showLoading = false;
      layer.msg('网络错误');
    })
  }
  goback() {
    this.location.back();
  }
  getImg(url){
    return `${WEB_URL_PREFIX}upload/getimg?imgurl=${url}`;
  }
}
