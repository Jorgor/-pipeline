import { Component, OnInit } from '@angular/core';
import { MineService } from './mine.service';
import {User} from "../../domain/user.domain";

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {
  userInfo: User = null;
  constructor(private serve: MineService) { }

  ngOnInit() {
    this.userInfo = this.serve.getUserInfo();
  }
  logout() {
    this.serve.logout().then(res => {
      console.log(res)
    })
  }
}
