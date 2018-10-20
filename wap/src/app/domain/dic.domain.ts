import {Target} from "./target.domain";
import {FaultType} from "./faultType.domain";
import {User} from "./user.domain";

export class Dic {
    pipelinePoint: string = '井盖';
    pipeline: string = '管线';
    pipeLineType= {
        'ys': '雨水管线',
        'ws': '污水管线',
        'ps': '雨污管线'
    };
    pipeLinePointType= {
        'ys': '雨水井盖',
        'ws': '污水井盖',
        'ps': '雨污井盖'
    };
    pipeLineTypeIcon= {
        'ys': "/assets/img/ys.png",
        'ws': "/assets/img/ws.png",
        'ps': "/assets/img/ps.png"
    };
    workorderStatus = {
        "pending": "待处理",
        "rejected": "已驳回",
        "processing": "处理中",
        "processed": "已处理",
        "closed": "已关闭"
    };
    WorkOrderStatusEnum = {
        "PENDING": "待处理",
        "REJECTED": "已驳回",
        "PROCESSING": "处理中",
        "PROCESSED": "已处理",
        "CLOSED": "已关闭"
    };
    sensorTypeIcon = {
        "LIQUID_LEVEL": "/assets/img/level_icon.png",
        "FLOW_SPEED": "/assets/img/flow_icon.png",
        "CAMERA": "/assets/img/camera_icon.png",
    };
    sensorTypeName = {
        "FLOW_SPEED": "流速",
        "LIQUID_LEVEL": "液位",
        "CAMERA": "摄像头",
    };
    sensorUnitName = {
        "FLOW_SPEED": "m/s",
        "LIQUID_LEVEL": "mm",
        "CAMERA": "",
    };
    sensorStatus = {
        "NORMAL": "正常状态",
        "PREWARNING": "异常状态",
        "WARNING": "告警状态",
        "null": "无",
    };
}
