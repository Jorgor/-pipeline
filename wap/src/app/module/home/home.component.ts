import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { WorkOrderService } from '../work-order/work-order.service';

import {Router} from '@angular/router';
declare const layer: any;
declare var AMap: any;
declare var $: any;
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
    });
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
    });
  }
  report() {
    const {id} = this.resloveDate;
    if (navigator.geolocation) {
      this.reportLoading = layer.load();
      navigator.geolocation.getCurrentPosition( (position) => {
        const {longitude, latitude} = position.coords;
        this.workServer.postPoint(id, {longitude, latitude}).then(res => {
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
    // this.workServer.postPoint();
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
          this.workServer.postPoint(id, {longitude, latitude}).then(res => {
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
  btnEmit(event) {
    if (!!event) { this[event](); }
  }
  gotoFeedback() {
    const {id} = this.resloveDate;
    this.router.navigate([`/home/work-order/resolve/${id}`]);
  }
  navigateUrl(url) {
    const router = {
      mapL: '/home/work-order/map',
      detail: '/home/work-order/detail',
    }
    sessionStorage.setItem('detail_data', JSON.stringify(this.resloveDate))
    this.router.navigate([router[url]]);
  }
}
