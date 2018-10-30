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
  detailbtns:Array<{event:String, name:String}> = []
  constructor(private server:HomeService, private workServer: WorkOrderService, private router: Router) { }

  ngOnInit() {
    this.server.getPending().then(res => {
      if(res.success && res.data) {
        this.pendingNum = res.data[0].total;
      }
    })
    this.server.getResloveing().then(res => {
      if(res.success && res.data) {
        this.resloveDate = res.data;
        if(res.data['patrolPlan']) {
          this.detailbtns = [{
            event: 'gotoFeedback',
            name: '处理'
          },{
            event: 'report',
            name: '上报'
          }]
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
    const {id} =this.resloveDate;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function (position) {  
        let longitude = position.coords.longitude;  
        let latitude = position.coords.latitude;
        },(e) => {
         const msg = e.code;
         const dd = e.message;
         this.workServer.postPoint(id, {longitude:1,latitude:2}).then(res => console.log(res))
         layer.msg(dd)
      })
    }else {
      layer.msg('请打开手机GPS')
    }
    // this.workServer.postPoint();
  }
  btnEmit(event) {
    event && this[event]()
  }
  gotoFeedback() {
    const {id} =this.resloveDate;
    this.router.navigate([`/home/work-order/resolve/:${id}`]);
  }

}
