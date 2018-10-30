import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {SettingsService} from "../../../core/settings/settings.service";
import {LoginService} from "../../login/login.service";
import 'rxjs/add/operator/toPromise';
import {FileUploader} from "ng2-file-upload";
import {DatePipe} from '@angular/common';

declare var $: any;
declare var layer: any;
declare var AMapUI: any; //ui组件库加载器，已下载到本地
import {Router} from "@angular/router";
import {PipeView2dService} from "./pipe-view-2d.service";
import {Pipeline} from "../../../domain/pipeline.domain";
import {Alarm} from "../../../domain/alarm.domain";
import {Dic} from "../../../domain/dic.domain";
import {Paginator} from "../../../domain/paginator.domain";
import {AlarmWithPosition} from "../../../domain/alarmWithPosition.domain";
import {FaultType} from "../../../domain/faultType.domain";
import {PipelinePoint} from "../../../domain/pipelinePoint.domain";
import {AlarmService} from "../../admin/alarm/alarm.service";
import {Cesspool} from "../../../domain/cesspool.domain";
import {WebPosi} from "../../../domain/web-posi.domain";
import {Coordinate} from "../../../../../../wap/src/app/domain/coordinate.domain";


@Component({
    selector: 'app-pipe-view-2d',
    templateUrl: './pipe-view-2d.component.html',
    styleUrls: ['./pipe-view-2d.component.scss'],

})
export class PipeView2dComponent implements OnInit, OnDestroy {


    constructor(private settingsService: SettingsService,
                private changeDetectorRef: ChangeDetectorRef,
                private router: Router,
                private datePipe: DatePipe,
                private alarmService: AlarmService,
                private pipeView2dService: PipeView2dService) {
    }

    public option = {
        opt: {
            resizeEnable: true,
            center: [106.424402398004, 29.821534016928],
            zoom: 17
        }, key: 'f3cfcdc7262b6db0f223b3b9d57b120b'
    };
    map;
    AMap;
    zoom;
    satelliteLayer;  //卫星地图图层
    PathSimplifier: any; //海量路径图层构造函数
    SimpleInfoWindow;  //信息窗口

    pathSimplifierIns; //海量路径图层对象
    showMapFilter = false;
    pipeLineData;  //所有管线数据
    fcCvsColor = '#fff';  //化粪池颜色
    dic: Dic = new Dic();

    public fcMarkerArr = [];
    public alarmMarkerArr = [];

    public alarm: AlarmWithPosition;
    public showCreateWorkOrder: boolean = false;

    get filer_type() {
        return {
            ys: this.show_ys,
            ws: this.show_ws,
            ps: this.show_ps
        };
    };

    getFilterPipelineData() {
        let arr = [];
        this.pipeLineData.forEach((item) => {
            if (!this.filer_type[item.type]) return;
            arr.push(item);
        });
        return arr;
    }

    _showSatelliteLayer: boolean;
    set showSatelliteLayer(v) {
        this._showSatelliteLayer = v;
        this._showSatelliteLayer ? this.satelliteLayer.show() : this.satelliteLayer.hide();
    }

    get showSatelliteLayer() {
        return this._showSatelliteLayer;
    }

    _show_fc = true;
    set show_fc(v) {
        this._show_fc = v;
        this._show_fc ? this.showFc() : this.removeFc();
    }

    get show_fc() {
        return this._show_fc;
    }

    _show_alarm = true;
    set show_alarm(v) {
        this._show_alarm = v;
        this._show_alarm ? this.showAlarm() : this.removeAlarm();
    }

    get show_alarm() {
        return this._show_alarm;
    }

    _show_ys = true;
    set show_ys(v) {
        this._show_ys = v;
        this.drawPipe(this.getFilterPipelineData());
    }

    get show_ys() {
        return this._show_ys;
    }

    _show_ws = true;
    set show_ws(v) {
        this._show_ws = v;
        this.drawPipe(this.getFilterPipelineData());
    }

    get show_ws() {
        return this._show_ws;
    }

    _show_ps = true;
    set show_ps(v) {
        this._show_ps = v;
        this.drawPipe(this.getFilterPipelineData());
    }

    get show_ps() {
        return this._show_ps;
    }

    _show_label = false;
    set show_label(v) {
        this._show_label = v;
        this.drawPipe(this.getFilterPipelineData());
    }

    get show_label() {
        return this._show_label;
    }

    public mapLoaded(info) {
        this.map = info.map;
        this.AMap = info.AMap;
        this.map.setMapStyle('amap://styles/blue');
        this.settingsService.createTag('assets/js/amapui/main.js', 'amapui', () => this.mapUiLoaded());
    }

    mapUiLoaded() {
        let infoWindowPromise: Promise<any>;
        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
            if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
            }
            this.PathSimplifier = PathSimplifier;
            infoWindowPromise.then(() => {
                this.pipeView2dService.getPipeline().then(r => {
                    this.pipeLineData = r.data.data;
                    this.addSatellite();
                    this.addController();
                    this.getFcArr();
                    this.getWarningAlertData();
                    this.drawPipe(this.pipeLineData);
                });
            });

        });
        infoWindowPromise = new Promise((resolve, reject) => {
                AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
                    this.SimpleInfoWindow = SimpleInfoWindow;
                    resolve();
                });
            }
        );
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

    //添加控件
    addController() {
        AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
            //缩放控件
            this.map.addControl(new BasicControl.Zoom({
                position: 'rb', //left top，左上角
                showZoomNum: false //显示zoom值
            }));
        });
    }

    //添加卫星图
    addSatellite() {
        this.satelliteLayer = new this.AMap.TileLayer.Satellite({});
        this.satelliteLayer.setMap(this.map);
        this.satelliteLayer.show();
        this.showSatelliteLayer = false;
    };

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

    //获取化粪池点
    public getFcArr() {
        this.pipeView2dService.getFcPoints().then((res) => {
            if (!res.success) {
                layer.msg('化粪池数据获取失败，请联系管理员！');
                return;
            }
            res.data.data.forEach((item) => {
                let marker = new this.AMap.Marker({
                    icon: new this.AMap.Icon({
                        image: '/assets/img/fc_point.png',
                        size: new this.AMap.Size(25, 20)
                    }),
                    position: [item.coordinate.longitude, item.coordinate.latitude], // this.map.getCenter(),
                    draggable: false,
                    offset: new this.AMap.Pixel(-12, -10),
                    cursor: 'Pointer',
                    map: this.map
                });
                marker.on('click', (info) => {
                    let infoWindow = new this.SimpleInfoWindow({
                        infoTitle: `<img class="margin_r_3" src="/assets/img/fc_point.png" width="25" height="20" alt=""><strong>化粪池信息</strong>`,
                        infoBody: this.cesspoolDetail.bind(this)(item),
                        offset: new this.AMap.Pixel(0, -4)
                    });
                    let point = [item.coordinate.longitude, item.coordinate.latitude];
                    infoWindow.open(this.map, point);
                    this.drawCesspoolPic(item);
                });
                this.fcMarkerArr.push(marker);
                // marker.setMap();
            });
        })
    }

    //  显示化粪池
    public showFc() {
        this.map.add(this.fcMarkerArr);
    }

    //  隐藏化粪池
    public removeFc() {
        this.map.remove(this.fcMarkerArr);
    }

    //  显示告警
    public showAlarm() {
        this.map.add(this.alarmMarkerArr);
    }

    //  隐藏告警
    public removeAlarm() {
        this.map.remove(this.alarmMarkerArr);
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

    posiDisToPixDis(pipeline: Pipeline) {
        let posi = this.getPipelinePointPosi(pipeline);
        let pix = [this.posiToPix(posi[0][0], posi[0][1]), this.posiToPix(posi[1][0], posi[1][1])]
        let disX = pix[1][0] - pix[0][0];
        let disY = pix[1][1] - pix[0][1];
        return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2))
    }

    //画管线
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
        pathSimplifierIns.on('pointClick', (e, info) => {
            const pointName = info.pointIndex == 0 ? 'startPoint' : 'endPoint';
            const pipelinePoint = info.pathData[pointName];
            let dic = new Dic();
            let type = pipelinePoint.serialNumber.substring(0, 2).toLowerCase();
            let infoWindow = new this.SimpleInfoWindow({
                infoTitle: `<img class="margin_r_3" src="${dic.pipeLineTypeIcon[type]}" width="20" height="20" alt=""><strong>${dic.pipeLinePointType[type]}ID:${pipelinePoint.id}</strong>`,
                infoBody: this.pipelinePointDetail.bind(this)(pipelinePoint),
                offset: new this.AMap.Pixel(0, -4)
            });
            let point = [info.pathData[pointName].coordinate.longitude, info.pathData[pointName].coordinate.latitude];
            infoWindow.open(this.map, point);
        });
        pathSimplifierIns.on('pathClick', (e, info) => {
            const pipeline = info.pathData;
            let dic = new Dic();

            let infoWindow = new this.SimpleInfoWindow({
                infoTitle: `<img class="margin_r_3" src="${dic.pipeLineTypeIcon[pipeline.type]}" width="20" height="20" alt=""><strong>${dic.pipeLineType[pipeline.type]}ID:${pipeline.id}</strong>`,
                infoBody: this.pipelineDetail.bind(this)(pipeline),
                offset: new this.AMap.Pixel(0, -4)
            });
            const point = this.getCenterPoint(info.pathData.startPoint.coordinate.longitude, info.pathData.startPoint.coordinate.latitude, info.pathData.endPoint.coordinate.longitude, info.pathData.endPoint.coordinate.latitude);
            infoWindow.open(this.map, point);
            this.map.setCenter(point); //如果管线的距离非常长，可以定位中心
        });

    };

    pipelineDetail(pipeline) {
        const serialNumber = `${pipeline.startPoint.serialNumber} =>${pipeline.endPoint.serialNumber}`;
        return `<div class="my-desc">
                    <p ><strong>编号:</strong>${serialNumber}</p>
                    <p ><strong>类型:</strong>${this.dic.pipeLineType[pipeline.type]} </p>
                    <p ><strong>材质:</strong>${pipeline.material} </p>
                    <p ><strong>直径:</strong>${pipeline.diameter} </p>
                    <p ><strong>长度:</strong>${pipeline.length} </p>
                    <p ><strong>建设年代:</strong>${pipeline.createdYear} </p>
                    <p ><strong>起点高程:</strong>高：${pipeline.startPoint.elevation.top}，低${pipeline.startPoint.elevation.bottom} </p>
                    <p ><strong>终点高程:</strong>高：${pipeline.endPoint.elevation.top}，低${pipeline.endPoint.elevation.bottom} </p>
                    <!--<p ><a class="btn btn-primary" onclick="pipeline2d_openPipeHistoryData(${serialNumber})">实时数据</a></p>-->
                </div>`;
    }

    pipelinePointDetail(pipelinePoint) {
        pipelinePoint.feature = pipelinePoint.feature == null ? '无' : pipelinePoint.feature;
        pipelinePoint.attachment = pipelinePoint.attachment == null ? '无' : pipelinePoint.attachment;
        return `<div class="my-desc">
                    <p ><strong>编号:</strong>${pipelinePoint.serialNumber} </p>
                    <p ><strong>特征:</strong>${pipelinePoint.feature} </p>
                    <p ><strong>附属物:</strong>${pipelinePoint.attachment} </p>
                    <p ><strong>高程:</strong>高：${pipelinePoint.elevation.top}，低${pipelinePoint.elevation.bottom} </p>
                </div>`;
    }

    cesspoolDetail(cesspool) {
        let directionInfo = this.getPipeLineDirectionCrossCesspool(cesspool),
            inStr = directionInfo.filter((item) => item.direction == "in").map((item) => item.serialNumber).join(','),
            outStr = directionInfo.filter((item) => item.direction == "out").map((item) => item.serialNumber).join(',');
        cesspool.feature = cesspool.feature == null||cesspool.feature == '' ? '无' : cesspool.feature;
        inStr = inStr == '' ? '无' : inStr;
        outStr = outStr == '' ? '无' : outStr;
        return `<div class="my-desc">
                    <p ><strong>编号:</strong>${cesspool.serialNumber} </p>
                    <p ><strong>特征:</strong>${cesspool.feature} </p>
                    <p ><strong>从管井流入:</strong>${inStr} </p>
                    <p ><strong>从管井流出:</strong>${outStr} </p>
                    <div >
                        <strong>示意图:</strong>
                        <canvas id="fc_canvas" class="fc_detail_pic"></canvas>
                    </div>
                </div>`;
    }

    drawCesspoolPic(cesspool: Cesspool) {
        let canvas = <HTMLCanvasElement> document.getElementById("fc_canvas"),
            ctx = canvas.getContext("2d"),
            dom = $("#fc_canvas"),
            center = new WebPosi(dom.width() / 2, dom.height() / 2),
            points = this.getPointsByCesspool(cesspool, center),
            scale = this.getScaleByPointsAndCenter(points, center, .7),
            pipelines = this.getLinesCrossCesspool(cesspool, center);
        ctx.transform(scale, 0, 0, scale, center.left - center.left * scale, center.top - center.top * scale);
        this.drawPolygon(points, ctx);
        this.drawPipelineCrossCesspool(pipelines, ctx);

    }

    getScaleByPointsAndCenter(points, center: WebPosi, fullScreenScale) {
        let maxL = 0,
            maxT = 0,
            scaleL = 0,
            scaleT = 0;
        points.forEach((item) => {
            let left = Math.abs(item[0] - center.left),
                top = Math.abs(item[1] - center.top)
            maxL = left >= maxL ? left : maxL;
            maxT = top >= maxT ? top : maxT;
        })
        if (maxL != 0 && maxT != 0) {
            scaleL = center.left / maxL;
            scaleT = center.top / maxT;
            return (scaleL > scaleT ? scaleL : scaleT)/2 * fullScreenScale;
        }
        return 1;
    }

    getPointsByCesspool(cesspool: Cesspool, center: WebPosi) {
        return cesspool.vertexes
            .filter((item) => item.serialNumber == '' || item.serialNumber == null)
            .map((item) => {
                return this.mapPosiToWebPosi(item.coordinate, cesspool, center)
            })
    }

    mapPosiToWebPosi(coordinate: Coordinate, cesspool: Cesspool, center: WebPosi) {
        return [
            this.keepPosiToMeter(coordinate.longitude) - this.keepPosiToMeter(cesspool.coordinate.longitude) + center.left,
            this.keepPosiToMeter(coordinate.latitude) - this.keepPosiToMeter(cesspool.coordinate.latitude) + center.top,
        ]
    }

    getPipeLineDirectionCrossCesspool(cesspool: Cesspool) {
        let serialNumberObj = this.getPipelinePointsInCesspoll(cesspool);
        return this.pipeLineData
            .filter((item: Pipeline) => serialNumberObj[item.startPoint.serialNumber] || serialNumberObj[item.endPoint.serialNumber])
            .map((item: Pipeline) => {
                if (serialNumberObj[item.startPoint.serialNumber]) {
                    return {serialNumber: item.startPoint.serialNumber, direction: "out"};
                }
                if (serialNumberObj[item.endPoint.serialNumber]) {
                    return {serialNumber: item.endPoint.serialNumber, direction: "in"};
                }
            })
    }

    getLinesCrossCesspool(cesspool: Cesspool, center: WebPosi) {
        let serialNumberObj = this.getPipelinePointsInCesspoll(cesspool);
        return this.pipeLineData.filter((item: Pipeline) => serialNumberObj[item.startPoint.serialNumber] || serialNumberObj[item.endPoint.serialNumber]).map((item: Pipeline) => {
            return [
                this.mapPosiToWebPosi(item.startPoint.coordinate, cesspool, center),
                this.mapPosiToWebPosi(item.endPoint.coordinate, cesspool, center),
            ]
        })
    }

    getPipelinePointsInCesspoll(cesspool: Cesspool) {
        let serialNumberObj = {};
        cesspool.vertexes.filter((item) => item.serialNumber != '').forEach((item) => {
            serialNumberObj[item.serialNumber] = true;
        })
        return serialNumberObj;
    }

    keepPosiToMeter(posi: string) {
        return Math.floor(parseFloat(posi) * 100000);
    }

    drawPolygon(points, ctx) {
        if (points.length < 4) return;
        ctx.beginPath();
        points.forEach((item, index) => {
            if (index == 0) {
                ctx.moveTo(item[0], item[1]);
            }
            else {
                ctx.lineTo(item[0], item[1]);
            }
        })
        ctx.lineTo(points[0][0], points[0][1]);
        ctx.strokeStyle = this.fcCvsColor;
        ctx.stroke();
    }

    drawPipelineCrossCesspool(pipelines, ctx) {
        if (pipelines.length == 0) return;
        pipelines.forEach((item, i) => {
            this.drawArrow(ctx, item[0][0], item[0][1], item[1][0], item[1][1], 25, 5, 1, this.fcCvsColor);
        })

    }

    drawArrow(ctx, fromX, fromY, toX, toY, angleNum, length, width, color) {
        angleNum = typeof(angleNum) != 'undefined' ? angleNum : 30;
        length = typeof(angleNum) != 'undefined' ? length : 10;
        width = typeof(width) != 'undefined' ? width : 1;
        color = typeof(color) != 'undefined' ? color : '#red';      // 计算各角度和对应的P2,P3坐标
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + angleNum) * Math.PI / 180,
            angle2 = (angle - angleNum) * Math.PI / 180,
            topX = length * Math.cos(angle1), topY = length * Math.sin(angle1), botX = length * Math.cos(angle2),
            botY = length * Math.sin(angle2);
        ctx.save();
        ctx.beginPath();
        var arrowX = fromX - topX, arrowY = fromY - topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
    }

    getCenterPoint(a, b, a1, b1) {
        return [(parseFloat(a) + parseFloat(a1)) / 2, (parseFloat(b) + parseFloat(b1)) / 2];
    }

    @ViewChild('pipeHistoryData') pipeHistoryData;
    pipeHistoryDataId;

    @ViewChild('warningAlert') warningAlert;
    alarmList: AlarmWithPosition[];

    getWarningAlertData() {
        this.alarmService.getAlarmList(new Paginator(1, 100)).then((res) => {
            if (!res.success) return;
            this.alarmList = res.data.data;
            this.createAlarmMarkers();
        });
    }

    alarmCount;

    ngOnInit() {
        window['pipeline2d_openPipeHistoryData'] = function (id = 0) {
            this.pipeHistoryDataId = id;
            this.pipeHistoryData.openSelf = true;
        }.bind(this);
        window['pipeline2d_createWorkOrder'] = function () {
            $('.amap-info').remove();
            this.showCreateWorkOrder = true;
        }.bind(this);
        this.alarmCount = setInterval(() => {
            // this.getWarningAlertData();
        }, 30000);
    }

    ngOnDestroy(): void {
        clearInterval(this.alarmCount);
    }

    getPositionFromAlarm(alarm: AlarmWithPosition) {
        let obj = alarm.target
        if (obj.type == 'pipeline') {
            return [(parseFloat(obj.object.endPoint.coordinate.longitude) + parseFloat(obj.object.startPoint.coordinate.longitude)) / 2, (parseFloat(obj.object.endPoint.coordinate.latitude) + parseFloat(obj.object.startPoint.coordinate.latitude)) / 2]
        }
        if (obj.type == 'pipelinePoint') {
            return [obj.object.coordinate.longitude, obj.object.coordinate.latitude]
        }
    }

    private createAlarmMarkers() {
        this.removeAlarm();
        this.alarmMarkerArr = [];
        this.alarmList.forEach((item: AlarmWithPosition) => {
            let marker = new this.AMap.Marker({
                content: `<div class="alarmPointIcon"><img src="/assets/img/alarm_map.png" alt=""></div>`,   //自定义点标记覆盖物内容
                position: this.getPositionFromAlarm(item), // this.map.getCenter(),
                offset: new this.AMap.Pixel(-15, -15),
                cursor: 'Pointer',
            });
            marker.on('click', (e) => {
                let infoWindow = new this.SimpleInfoWindow({
                    infoTitle: `<img class="margin_r_3" src="/assets/img/alarm_map.png" width="20" height="20" alt=""><strong>告警信息</strong>`,
                    infoBody: this.alarmDetail.bind(this)(item),
                    offset: new this.AMap.Pixel(0, -4)
                });
                let point = this.getPositionFromAlarm(item);
                infoWindow.open(this.map, point);
            });
            this.alarmMarkerArr.push(marker);
        });
        this.showAlarm();
    }

    alarmDetail(alarm: AlarmWithPosition) {
        this.alarm = alarm;
        let alarmTime = this.datePipe.transform(new Date(alarm.time), 'yyyy-MM-dd HH:mm:ss');
        return `<div class="my-desc ">
                    <p ><strong>描述:</strong>${alarm.description} </p>
                    <p ><strong>时间:</strong>${alarmTime} </p>
                    <p class="align_c" >
                        <span class="btn btn-primary"  onclick="pipeline2d_createWorkOrder()">立即处理</span>
                    </p>
                </div>`;
    }
}
