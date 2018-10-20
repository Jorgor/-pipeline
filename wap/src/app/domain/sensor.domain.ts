import {Target} from "./target.domain";
import {FaultType} from "./faultType.domain";
import {User} from "./user.domain";
import {SensorValue} from "./sensorValue.domain";

export class Sensor {
    id: number;
    sn: string;
    type: string;
    currentValue: SensorValue;
    address:string
    status: string;
    pipelineId: string;
    pipelineNumber: string;
    pipelineType: string;
    deviceId: string;
    productId: string;
}
