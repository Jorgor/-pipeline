import {Target} from "./target.domain";
import {FaultType} from "./faultType.domain";
import {User} from "./user.domain";
import {Sensor} from "./sensor.domain";
import {Pipeline} from "./pipeline.domain";

export class SensorPoint {

	id: number;
	pipeline: Pipeline=new Pipeline();  //故障目标(管线或管点)
    levelSensor:Sensor=new Sensor();
	flowSensor:Sensor=new Sensor();
}
