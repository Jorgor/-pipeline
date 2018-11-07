import { Component, OnInit } from '@angular/core';
import {Location,DatePipe} from '@angular/common';
import { WorkOrderService} from '../work-order.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {
  detailId : number;
  list_data : object ;
  title : any;
  maintain:Array<any> = [
    {
      code: "PENDING",
      name: "待处理工单"
    },
    {
      code: "PROCESSING",
      name: "正在处理工单"
    },
    {
      code: "PROCESSED",
      name: "已处理工单"
    },
    {
      code: "REJECTED",
      name: "已驳回工单",
    },
    {
      code: "CLOSED",
      name: "已关闭工单"
    }
  ];
  constructor(private listService : WorkOrderService,private routerIonfo:ActivatedRoute,public location: Location,private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.detailId = this.routerIonfo.snapshot.params["status"];
    this.title = this.maintain.filter( (item) => item.code == this.detailId ) && this.maintain.filter( (item) => item.code == this.detailId )[0].name;
    this.listService.getList(this.detailId).then( ({success,data}) => {
      if(success){
        if(data['data'].length){
           this.list_data = data['data'];
        }
      }
    })
  }
  onSelect(data){
    this.listService.saveDetail(this.list_data[data]);
    // this.selectDetail = data;
  }
  goback() {
    this.location.back();
  }
  gotoMap(data) {
    this.onSelect(data);
    this.router.navigate([`/home/work-order/map`]);
  }
}
