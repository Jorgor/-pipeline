import {BaseService} from "../../../core/base.service";
import {Pipeline} from "../../../domain/pipeline.domain";
import {Alarm} from "../../../domain/alarm.domain";
import {Response} from "../../../domain/response.domain";

export class PipeView2dService extends BaseService {


    private path: string = "pipeline";
    private orphanPoint: string = "orphanPoint";
    private fcPoint: string = "cesspool";

    getPipeline(pageSize: number = 1000): Promise<Response> {
        return this.get(this.path + '?pageSize=' + pageSize).then((res) => {
            return this.getOrphanPoint().then((resOrphan) => {
                // res.data.data = res.data.data.concat(resOrphan.data.data);
                return res;
            });
        });
        // return Promise.resolve({
        //     "success": true,
        //     "data": [
        //         {
        //             id: 1, type: 'ys',
        //             startPoint: {
        //                 id: '11',
        //                 coordinate: {
        //                     longitude: '106.435516',
        //                     latitude: '29.830085'
        //                 }
        //             },
        //             endPoint: {
        //                 id: '12',
        //                 coordinate: {
        //                     longitude: '106.435716',
        //                     latitude: '29.830185'
        //                 }
        //             },
        //             StartElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //             endElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //         },
        //         {
        //             id: 3, type: 'ws',
        //             startPoint: {
        //                 id: '12',
        //                 coordinate: {
        //                     longitude: '106.435716',
        //                     latitude: '29.830185'
        //                 }
        //             },
        //             endPoint: {
        //                 id: '13',
        //                 coordinate: {
        //                     longitude: '106.436116',
        //                     latitude: '29.830285'
        //                 }
        //             },
        //             StartElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //             endElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //         },
        //         {
        //             id: 4, type: 'ys',
        //             startPoint: {
        //                 id: '13',
        //                 coordinate: {
        //                     longitude: '106.436116',
        //                     latitude: '29.830285'
        //                 }
        //             },
        //             endPoint: {
        //                 id: '14',
        //                 coordinate: {
        //                     longitude: '106.4212255',
        //                     latitude: '29.8214901'
        //                 }
        //             },
        //             StartElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //             endElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //         },
        //         {
        //             id: 6, type: 'ps',
        //             startPoint: {
        //                 id: '14',
        //                 coordinate: {
        //                     longitude: '106.4212255',
        //                     latitude: '29.82149016'
        //                 }
        //             },
        //             endPoint: {
        //                 id: '15',
        //                 coordinate: {
        //                     longitude: '106.4214391',
        //                     latitude: '29.82135728'
        //                 }
        //             },
        //             StartElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //             endElevations: {
        //                 top: '12',
        //                 bottom: '123'
        //             },
        //         },
        //     ],
        //     "msg": "success"
        // });
    }

    getOrphanPoint(pageSize: number = 1000): Promise<Response> {
        // return this.get(this.orphanPoint + '?' + 'pageSize=' + pageSize).then((resOrphan) => this.orphanPointToPipeline(resOrphan));
        const res = {
            "success": true,
            "data": {
                data: [
                    {
                        id: 23,
                        serialNumber: 'E234', //井点编号
                        feature: '', //特征
                        attachment: '井盖', //附属物
                        coordinate: {
                            longitude: '106.435516',
                            latitude: '29.830085'
                        }, //坐标
                        elevation: {
                            top: '12',
                            bottom: '123'
                        }, //高程
                        ground: '29.830085', //地面高度
                    }
                ]
            },
            "msg": "success"
        };
        return Promise.resolve(res).then((resOrphan) => this.orphanPointToPipeline(resOrphan));
    }
    getFcPoints(pageSize: number = 1000): Promise<Response> {
        const res = {
            "success": true,

            "data": {
                data: [
                    {
                        id: 23,
                        serialNumber: 'FC234', //井点编号
                        feature: '化粪池', //特征
                        coordinate: {
                            "longitude": 106.42517,
                            "latitude": 29.82295
                        }, //坐标
                        vertexes: [
                            {
                                "id": "5bb195793039d71d9c6f156c",
                                "serialNumber": "YS505",
                                "feature": "起点",
                                "attachment": "检查井",
                                "coordinate": {
                                    "longitude": 106.42507,
                                    "latitude": 29.82285
                                },
                                "elevation": {
                                    "top": 0,
                                    "bottom": 208.7
                                },
                                "ground": 247.8
                            },
                            {

                                "coordinate": {
                                    "longitude": 106.42537,
                                    "latitude": 29.82235
                                },
                            },

                            {

                                "coordinate": {
                                    "longitude": 106.42557,
                                    "latitude": 29.82275
                                },

                            },
                            {

                                "coordinate": {
                                    "longitude": 106.42527,
                                    "latitude": 29.82305
                                },

                            },

                        ],
                    }
                ]
            },
            "msg": "success"
        };
        // return Promise.resolve(res);
        return this.get(this.fcPoint + '?' + 'pageSize=' + pageSize);
    }
    orphanPointToPipeline(res) {
        res.data.data = res.data.data.map((item => {
            const pipeline = new Pipeline();
            pipeline.type=item.serialNumber.substring(0,2).toLowerCase();
            pipeline.startPoint = item;
            pipeline.endPoint = item;
            return pipeline;
        }));
        return res;
    }
}
