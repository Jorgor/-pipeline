import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var AMap: any;
declare var $: any;

@Component({
  // moduleId: module.id,
  selector: 'amap',
  templateUrl: 'amap.component.html',
  styleUrls: ['amap.component.css']
})
export class AmapComponent implements OnInit {
  @Input() option;

  @Output() mapLoaded = new EventEmitter();

  constructor() {
  }

  createTag(url: string, className, func = null) {  //定义方法
    if ($('.' + className).length) {
      func.bind(this)();
      return;
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.className = className;
    script.onload = func.bind(this);
    document.body.appendChild(script);
  };

  ngOnInit() {
    this.createTag('http://webapi.amap.com/maps?v=1.4.5&key=' + this.option.key+'&plugin=AMap.DistrictSearch,AMap.Autocomplete,AMap.PlaceSearch,AMap.ToolBar', 'amap', () => {
      let map = new AMap.Map('container_amap', this.option.opt);
      map.on('complete', () => {
        this.mapLoaded.emit({map: map, AMap: AMap});
      });
    });
  }
}
