import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  hasNav: Boolean = true;
  hideNavUrl: Array<string> = [
    '/home/work-order/work-list',
    '/home/work-order/detail',
    '/home/work-order/resolve',
    '/home/work-order/map'
  ]
  constructor(private router: Router) { }

  ngOnInit() {
    const url = this.router.url;
    if(this.hideNavUrl.some(u => !!url.match(u))) {
      this.hasNav = false;
    } else {
      this.hasNav = true;
    }
    this.router.events.filter(event => event instanceof NavigationStart).subscribe((event) => {
      if(this.hideNavUrl.some(u => !!event['url'].match(u))) {
        this.hasNav = false;
      } else {
        this.hasNav = true;
      }
    });
  }

}
