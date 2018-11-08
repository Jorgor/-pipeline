import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { WorkOrderService } from '../work-order.service';
import {WEB_URL_PREFIX} from '../../../../assets/server/http-link.data';

declare const layer: any;
declare var AMap: any;
declare var $: any;

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
      this.reportLoading = layer.load();
      navigator.geolocation.getCurrentPosition( (position) => {
        const {longitude, latitude} = position.coords;
        this.serve.postPoint(id, {longitude, latitude}).then(res => {
            layer.close(this.reportLoading);
            this.reportLoading = false;
            layer.msg(res.msg)
          })
        }, (e) => {
         // const msg = e.code;
         const dd = e.message;
         this.initmap(id);
      });
    }else {
      layer.msg('请打开手机GPS')
      this.initmap(id);
    }
  }
  initmap(id) {
    const script = document.createElement('script');
    const option = {
      opt: {
          resizeEnable: true,
          zoom: 17
      }, key: 'f3cfcdc7262b6db0f223b3b9d57b120b'
    };
    if ($('#reportMap').length) {
     return this.getReport(option, id);
    }
    script.id = 'reportMap';
    script.type = 'text/javascript';
    script.src = 'http://webapi.amap.com/maps?v=1.4.5&key='+option.key+'&plugin=AMap.DistrictSearch,AMap.Autocomplete,AMap.PlaceSearch,AMap.ToolBar';
    script.className = 'map';
    script.onload = () => {
      this.getReport(option,id);
    }
    document.body.appendChild(script);
  }
  getReport(option, id) {
    const map = new AMap.Map('hide-map', option.opt);
    map.plugin('AMap.Geolocation', () => {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', (data) => {
        const {lng: longitude, lat: latitude} = data.position;
          this.serve.postPoint(id, {longitude, latitude}).then(res => {
            layer.close(this.reportLoading);
            this.reportLoading = false;
            layer.msg(res.msg);
          });
      });
      AMap.event.addListener(geolocation, 'error', (data) => {
        layer.msg(data.message);
      });
    });
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
    });
  }
  goback() {
    this.location.back();
  }
  getImg(url){
    return `${WEB_URL_PREFIX}upload/getimg?imgurl=${url}`;
  }
}
