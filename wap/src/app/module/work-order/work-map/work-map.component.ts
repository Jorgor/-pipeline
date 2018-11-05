import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import {SettingsService} from '../../../core/settings/settings.service';

declare var layer: any;
declare var AMapUI: any;

@Component({
  selector: 'app-work-map',
  templateUrl: './work-map.component.html',
  styleUrls: ['./work-map.component.scss']
})
export class WorkMapComponent implements OnInit {

  constructor(public location: Location,private settingsService: SettingsService) { }
  public option = {
      opt: {
          resizeEnable: true,
          center: [106.424402398004, 29.821534016928],
          zoom: 17
      }, key: 'f3cfcdc7262b6db0f223b3b9d57b120b'
  };
  map;
  AMap;
  detail;
  PathSimplifier: any;
  satelliteLayer;
  pathSimplifierIns;
  ngOnInit() {
    const detail = sessionStorage.getItem('detail_data')
    this.detail = detail && JSON.parse(detail);
  }
  goback() {
    this.location.back();
  }
  mapLoaded(e) {
    this.map = e.map;
    this.AMap = e.AMap;
    this.map.setMapStyle('amap://styles/blue');
    this.settingsService.createTag('assets/js/amapui/main.js', 'amapui', () => this.setMap());
  }
  setMap() {
    // console.log(this.detail);
    this.addSatellite();
    this.addController();
    if (this.detail.trail && this.detail.patrolPlan) {
      this.setPolyline(this.detail.trail);
    }
    if (this.detail.alarm) {
      const { object } = this.detail.alarm.target;
      if (object && object.coordinate) {
        this.goToLocation([object.coordinate.longitude, object.coordinate.latitude]);
      } else {
        this.setPolyline([].concat(object.endPoint.coordinate, object.startPoint.coordinate));
      }
    }
  }
  //  画轨迹
  setPolyline(trail) {
    const finalPath = trail.reduce((n, a) => {
        n.push([a.longitude, a.latitude]);
        return n;
    }, []);
    this.map.setCenter(finalPath[0]);
    const polyline = new this.AMap.Polyline({
        showDir: true,
        strokeColor: 'red', // 线条颜色
        lineJoin: 'round',
        strokeWeight: 3,
        borderWeight: 1,
        strokeOpacity: 0.5,
        path: finalPath
    });
    polyline.setMap(this.map);
    // 缩放地图到合适的视野级别
    // this.map.setFitView([ polyline ]);
    this.map.setZoom(19);
  }
  // 定位到指定点，并跳动标记
  goToLocation(position) {
    this.map.setCenter(position);
    const marker = new this.AMap.Marker({
        icon: new this.AMap.Icon({
            image: '/assets/img/blue_water.png',
            imageSize: new this.AMap.Size(25, 30),
            size: new this.AMap.Size(30, 30)
        }),
        position: position, // this.map.getCenter(),
        draggable: false,
        offset: new this.AMap.Pixel(-15, -30),
        cursor: 'move',
        map: this.map
    });
    // 设置点标记的动画效果，此处为弹跳效果
    marker.setAnimation('AMAP_ANIMATION_DROP');
  }
  _showSatelliteLayer: Boolean;
  set showSatelliteLayer(v) {
      this._showSatelliteLayer = v;
      this._showSatelliteLayer ? this.satelliteLayer.show() : this.satelliteLayer.hide();
  }

  get showSatelliteLayer() {
      return this._showSatelliteLayer;
  }

  // 添加卫星图
  addSatellite() {
      this.satelliteLayer = new this.AMap.TileLayer.Satellite({});
      this.satelliteLayer.setMap(this.map);
      this.satelliteLayer.show();
      this.showSatelliteLayer = false;
  }

  // 添加控件
  addController() {
    AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
        // 缩放控件
        this.map.addControl(new BasicControl.Zoom({
            position: 'rb', // left top，左上角
            showZoomNum: false // 显示zoom值
        }));
    });
  }
}
