import {Alarm} from "./alarm.domain";
import {FaultType} from "./faultType.domain";
import {User} from "./user.domain";

export class Fault extends Alarm {
    faultType: string;
    reportor: User;
    photos: string[];
}
