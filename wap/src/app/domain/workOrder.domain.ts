import {WorkOrderStatus} from "./workOrderStatus.domain";
import {Alarm} from "./alarm.domain";
import {WorkOrderFeedback} from "./workOrderFeedback.domain";
import {User} from "./user.domain";
export class WorkOrder {

	id: number;
	status: String; //工单状态
	alarm: Alarm = new Alarm(); //隶属故障
	feedback: Array<WorkOrderFeedback>  //反馈列表
	assigned: User = new User(); //执行人
	created: User = new User(); //创建人
	creatTime: Date; //创建时间
	finishTime: Date; //完成时间

    constructor(){
        this.id = 0;
        this.status = "";
        this.assigned.id = 0;
        this.alarm.id = 0;
    }
}
