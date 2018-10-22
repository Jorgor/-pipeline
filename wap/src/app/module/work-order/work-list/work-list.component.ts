import { Component, OnInit } from '@angular/core';
import { WorkListService} from '../work-list.service'

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {

  constructor(private listService : WorkListService) { }

  ngOnInit() {
    // this.listService.getList().then( ({success,data}) => {
    //   if(success){
    //     console.log(data)
    //   }
    // })
  }

}
