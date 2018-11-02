import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { WorkOrderService } from '../work-order/work-order.service';

import {Router} from '@angular/router';
declare const layer: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pendingNum: Number = 0;
  resloveDate: any = null;
  detailbtns: Array<{event: String, name: String}> = [];
  reportLoading: Boolean = false;
  detailTitle = {
    PROCESSED: '已处理',
    PROCESSING: '正在处理',
    PENDING: '待处理工单',
    REJECTED: '已驳回工单'
  }
  constructor(private server: HomeService, private workServer: WorkOrderService, private router: Router) { }

  ngOnInit() {
    this.server.getPending().then(res => {
      if (res.success && res.data) {
        this.pendingNum = res.data[0].total;
      }
    })
    this.server.getResloveing().then(res => {
      if (res.success && res.data) {
        // sessionStorage.setItem('HAS_DOING', 'false');
        this.resloveDate = res.data;
        if(res.data['patrolPlan']) {
          this.detailbtns = [{
            event: 'gotoFeedback',
            name: '处理'
          }, {
            event: 'report',
            name: '上报'
          } ]
        } else {
          this.detailbtns = [{
            event: 'gotoFeedback',
            name: '处理'
          }]
        }
      }
    })
  }
  report() {
    const {id} = this.resloveDate;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        const {longitude, latitude} = position.coords;
        this.reportLoading = layer.load();
        this.workServer.postPoint(id, {longitude, latitude}).then(res => {
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
    // this.workServer.postPoint();
  }
  btnEmit(event) {
    if (!!event) { this[event](); }
  }
  gotoFeedback() {
    const {id} = this.resloveDate;
    this.router.navigate([`/home/work-order/resolve/${id}`]);
  }

}
