import {Target} from "./target.domain";
import {AlarmType} from "./alarm-type.domain";
import {HandleStatus} from "./handle-status.domain";

export class Alarm {
    id: number;
    alarmType: AlarmType;
    time: Date;
    handleStatus: HandleStatus;
    target: Target;
    description: string;
    preplanId: number;
}
