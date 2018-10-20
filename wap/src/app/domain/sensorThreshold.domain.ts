import {Range} from "./range.domain";

export class SensorThreshold {

    id: number;
    sensorId: string;
    prewarning: Range;
    warning: Range;

    constructor(){
        this.sensorId = "";
        this.prewarning = new Range();
        this.warning = new Range();
    }

}