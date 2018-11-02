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
    console.log(this.map, this.AMap, this.detail);
    this.addSatellite();
        this.addController();
        // this.getFcArr();
        // this.getWarningAlertData();
        // this.drawPipe(this.detail.trail);
        var l = 106, t = 29;
        const path = this.detail.trail.reduce((n, p) => {
          n.push([l, t]);
          l+=0.05;
          t+=0.05;
          return n;
        }, []);
        const polyline = new this.AMap.Polyline({
          showDir: true,
          strokeColor: '#28F',  // 线颜色
          strokeWeight: 6,
          path
        });
        console.log(polyline)
        this.map.add(polyline);
        console.log(path)
        this.goToLocation([106.424402398004, 29.821534016928])
  }

  //定位到指定点，并跳动标记
  goToLocation(position) {
    this.map.setCenter(position);
    let marker = new this.AMap.Marker({
        icon: new this.AMap.Icon({
            image: '/assets/img/warngicon.png',
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
    setTimeout(function () {
        marker.setMap();
    }, 5000);
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

  // 画管线
  drawPipe(pipelines) {
    if (this.pathSimplifierIns) this.pathSimplifierIns.setData();
    var pathSimplifierIns = new this.PathSimplifier({
        zIndex: 100,
        // autoSetFitView: true,
        map: this.map,
        data: pipelines,
        getPath: function (pipeline, pathIndex) {
            let posi = this.getPipelinePointPosi(pipeline);
            return posi;
        }.bind(this),
        getHoverTitle: function (pipeLine, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
                const pointName = pointIndex == 0 ? 'startPoint' : 'endPoint';
                return `
            <span>井盖ID:${pipeLine[pointName].id}</span><br>
            `;
            }
            return `
          <span>管线ID:${pipeLine.id}</span><br>
          `;
        },
        renderOptions: {
            getPathStyle: this.getPathStyle.bind(this)
        }
    });
    this.pathSimplifierIns = pathSimplifierIns;
  }
  getPathStyle(mapPipeLine) {
    let pipeline = mapPipeLine.pathData
    const colors = {
        'ys': '#00CEFF',
        'ws': '#FFA800',
        'ps': '#00FF04'
    };
    const color = colors[pipeline.type],
        lineWidth = 1,
        step = (this.posiDisToPixDis(pipeline) + 4) / 2;
    return {
        startPointStyle: this.getPointStyle.bind(this)(),
        endPointStyle: this.getPointStyle.bind(this)(),
        pathLineStyle: {
            strokeStyle: color,
            lineWidth: lineWidth,
            borderWidth: 0,
            dirArrowStyle: this.map.getZoom() >= 18 ? {stepSpace: step, width: 10} : false
        },
        pathLineSelectedStyle: {
            lineWidth: lineWidth + 2,
        },
        pathLineHoverStyle: {
            lineWidth: lineWidth + 2,
        },
        pathNavigatorStyle: {
            fillStyle: color
        }
    };
  }
  getPipelinePointPosi(pipeline) {
    const startPosi = [pipeline.startPoint.coordinate.longitude, pipeline.startPoint.coordinate.latitude],
        endPosi = [pipeline.endPoint.coordinate.longitude, pipeline.endPoint.coordinate.latitude];
    return [startPosi, endPosi];
  }

  posiToPix(lng, lat) {
      var px = lng, py = lat;
      if (px && py) {
          var pixel = this.map.lnglatTocontainer([px, py]);
          return [pixel.getX(), pixel.getY()];
      }
  }

  posiDisToPixDis(pipeline) {
      let posi = this.getPipelinePointPosi(pipeline);
      let pix = [this.posiToPix(posi[0][0], posi[0][1]), this.posiToPix(posi[1][0], posi[1][1])]
      let disX = pix[1][0] - pix[0][0];
      let disY = pix[1][1] - pix[0][1];
      return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2))
  }
  getPointStyle() {
    let zoom = this.map.getZoom();
    return {
        radius: function () {
            if (zoom > 17) return 2;
            if (zoom < 16) return 0;
            return 1;
        }(),
        fillStyle: '#ccc',
        strokeStyle: '#fff',
        lineWidth: 1
    };
  }
}
