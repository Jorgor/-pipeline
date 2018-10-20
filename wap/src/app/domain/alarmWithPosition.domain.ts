import {Target} from "./target.domain";
import {FaultType} from "./faultType.domain";
import {User} from "./user.domain";

export class AlarmWithPosition {

    id: number = 0;
    alarmType:string='';
    subType: string = '';
    description: string = '';
    urls:string='';
    time:Date=new Date;
    handleStatus:string='';
    relId:number=0;
    target:Target=new Target();
    preplanId:number=0;

}
