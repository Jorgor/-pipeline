import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  hasNav: boolean = true;
  hideNavUrl: Array<string> = [
    '/tab/work-order/work-list',
    '/tab/work-order/detail'
  ]
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationStart).subscribe((event) => {
      if(this.hideNavUrl.some(u => event['url'].match(u))) {
        this.hasNav = false;
      } else {
        this.hasNav = true;
      }
    });
  }

}
