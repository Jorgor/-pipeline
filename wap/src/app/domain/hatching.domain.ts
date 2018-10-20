import {Alarm} from "./alarm.domain";
import {FaultType} from "./faultType.domain";
import {User} from "./user.domain";
import {Coordinate} from "./coordinate.domain";

export class Hatching {
    startPoint: Coordinate;
    endPoint: Coordinate;

    constructor(startPoint: Coordinate = new Coordinate(),
                endPoint: Coordinate = new Coordinate()) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
}
