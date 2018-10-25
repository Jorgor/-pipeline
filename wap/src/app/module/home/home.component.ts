import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pendingNum = 0;
  resloveNum = null
  constructor(private server:HomeService) { }

  ngOnInit() {
    this.server.getPending().then(res => {
      if(res.success && res.data) {
        this.pendingNum = res.data[0].total;
      }
    })
    this.server.getResloveing().then(res => {
      if(res.success && res.data) {
        this.resloveNum = res.data
      }
    })
  }

}
