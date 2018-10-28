import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {

  status = {
    PENDING:{
      title: '待处理工单',
      btn: {
        name: '开始处理',
        event: 'btnEvent'
      }
    },
    PROCESSING:{
      title: '正在处理',
      btn: {
        name: '确定',
        event: 'btnEvent'
      }
    },
    PROCESSED:{
      title: '已处理工单',
      btn: null
    },
    REJECTED:{
      title: '已驳回工单',
      btn: {
        name: '开始处理',
        event: 'btnEvent'
      }
    },
    CLOSED:{
      title: '已关闭工单',
      btn: null
    }
  }
  activeDetail = this.status.PENDING;
  constructor(private route: ActivatedRoute, public location: Location) { }
  ngOnInit() {
    this.route.params.subscribe(({status}) => {
      this.activeDetail = this.status[status||'REJECTED']
    });
  }
  detailEvent(fnName) {
    this[fnName] && this[fnName]();
  }
  btnEvent() {
    console.log('event click')
  }
  goback() {
    this.location.back();
  }

}
