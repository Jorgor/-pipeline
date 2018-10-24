import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private server:HomeService) { }

  ngOnInit() {
    this.server.getPending().then(res => {
      console.log('getPending', res)
    })
    this.server.getResloveing().then(res => {
      console.log('getResloveing', res)
    })
  }

}
