import {BaseService} from "../core/base.service";
import {Paginator} from "../domain/paginator.domain";
import {Response} from "../domain/response.domain";
export class AlarmService extends BaseService {
    private alarmPath: String = "alarm/";
    //故障检索
    getAlarmList( paginator: Paginator): Promise<Response> {
        // let condition = "?pageNo=" + paginator.pageNo + "&pageSize=" + paginator.pageSize;
        // return this.get(this.alarmPath + condition);

        return Promise.resolve({
            "success":true,
            "data":{
                "data":[
                    {
                        id: 1,
                        alarmType: "PREWARNING",
                        time: new Date(),
                        handleStatus: "PENDING",
                        target: {
                            id: 2,
                            type: "pipeline",
                            object:
                                {
                                    "id":"5bbc664d583ff93f40587711",
                                    "type":"ws",
                                    "material":"未知",
                                    "diameter":0.0,
                                    "length":0.0,
                                    "createdYear":"未知",
                                    "expireYear":null,
                                    "startPoint":{
                                        "id":null,
                                        "serialNumber":"WS107",
                                        "feature":null,
                                        "attachment":"检查井",
                                        "coordinate":{
                                            "longitude":106.426771918403,
                                            "latitude":29.821612413195
                                        },
                                        "elevation":{
                                            "top":0.0,
                                            "bottom":203.58
                                        },
                                        "ground":242.68
                                    },
                                    "endPoint":{
                                        "id":null,
                                        "serialNumber":"WS388",
                                        "feature":null,
                                        "attachment":"",
                                        "coordinate":{
                                            "longitude":106.427702365452,
                                            "latitude":29.820665961372
                                        },
                                        "elevation":{
                                            "top":0.0,
                                            "bottom":197.37
                                        },
                                        "ground":236.47
                                    },
                                    "startElevation":{
                                        "top":0.0,
                                        "bottom":0.0
                                    },
                                    "endElevation":{
                                        "top":0.0,
                                        "bottom":0.0
                                    },
                                    "startDepth":0.0,
                                    "endDepth":0.0,
                                    "sensors":null
                                },
                        },
                        description: "污水溢出",
                        preplanId: 2,
                    }
                ],
                "page":{
                    "pageNo":1,
                    "pageSize":1000,
                    "totalResults":1,
                    "offset":0
                }
            },
            "msg":"success"
        })
    }
}
