import {PipelinePoint} from "./pipelinePoint.domain";
import {Elevation} from "./elevation.domain";
import {Sensor} from "./sensor.domain";

export class Pipeline {

	id: number;
	type: string; //管线类型
	material: string; //材质
	diameter: number; //直径
	length: number; //长度
	createdYear: string; //建设年代
	startPoint: PipelinePoint; //起点
	endPoint: PipelinePoint; //终点
	startElevation: Elevation; //高程高点
	endElevation: Elevation;  //高程低点
	startDepth: number; //起点埋深
	endDepth: number; //终点埋深
    sensors: Sensor[]; //传感器列表

}
