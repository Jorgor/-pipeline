import { Component, OnInit } from '@angular/core';
import { WorkOrderService} from '../work-order.service';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {
  private  detailId : number;
  constructor(private listService : WorkOrderService,private routerIonfo:ActivatedRoute) { }

  ngOnInit() {
    this.detailId = this.routerIonfo.snapshot.params["status"];
    console.log(this.detailId)
    this.listService.getList(this.detailId).then( ({success,data}) => {
      if(success){
        if(data.length){
           this.listService.saveDetail(data);
        }
      }
    })
  }

}
