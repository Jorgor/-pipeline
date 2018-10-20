import { Component, OnInit } from '@angular/core';

import {WorkOrderService} from './work-order.service'
import {WorkOrderStatus} from "../../domain/workOrderStatus.domain";
@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit {
  maintain:Array<any> = [
    {
      code: "PENDING",
      name: "待处理工单",
      total: 0
    },
    {
      code: "PROCESSING",
      name: "正在处理工单",
      total: 0
    },
    {
      code: "PROCESSED",
      name: "已处理工单",
      total: 0
    },
    {
      code: "REJECTED",
      name: "已驳回工单",
      total: 0
    },
    {
      code: "CLOSED",
      name: "已关闭工单",
      total: 0
    }
  ];
  activeOrder:number = 1;
  constructor(private server: WorkOrderService) { }

  ngOnInit() {
    this.server.getCount().then(({success, data}) => {
      if(success) {
        const newMaintain = []
        this.maintain.forEach(o => {
          const i =  data.findIndex(n => n.code === o.code);
          if(i !== -1) {
            const target = data.splice(i, 1);
            newMaintain.push({...o,total:target[0]['total']})
          }
        })
        this.maintain = newMaintain;
      }
    })
  }
  changeType(type) {
    // todo
    this.activeOrder = type;
  }

}
