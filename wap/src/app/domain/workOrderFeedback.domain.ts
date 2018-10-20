import {WorkOrder} from "./workOrder.domain";

export class WorkOrderFeedback {

	id: number;
	cause: string;  //故障原因
	action: string; //解决方案
	workOrder: WorkOrder; //隶属工单
	photos: String; //解决方案拍照图集
	time: Date; //反馈时间
	audit: string; //审核意见

}
