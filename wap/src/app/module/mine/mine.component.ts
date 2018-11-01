import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../routes/login/login.service'
import { MineService } from './mine.service';
import {User} from "../../domain/user.domain";

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {
  userInfo: User = null;
  constructor(private serve: LoginService, private minServer:MineService) { }

  ngOnInit() {
    this.userInfo = this.minServer.getUserInfo();
  }
  logout() {
    this.serve.logout()
  }
}
