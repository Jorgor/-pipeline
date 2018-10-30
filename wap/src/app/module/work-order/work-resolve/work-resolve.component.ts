import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-work-resolve',
  templateUrl: './work-resolve.component.html',
  styleUrls: ['./work-resolve.component.scss']
})
export class WorkResolveComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }
  goback() {
    this.location.back();
  }
}
