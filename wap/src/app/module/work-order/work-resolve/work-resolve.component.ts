import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';

import {WorkOrderFeedback} from '../../../domain/workOrderFeedback.domain';
import {WorkOrderService} from '../work-order.service';
import {WEB_URL_PREFIX} from "../../../../assets/server/http-link.data";

declare const layer: any;

@Component({
  selector: 'app-work-resolve',
  templateUrl: './work-resolve.component.html',
  styleUrls: ['./work-resolve.component.scss']
})
export class WorkResolveComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: WorkOrderFeedback = new WorkOrderFeedback();
  uploader:FileUploader = new FileUploader({    
      url: WEB_URL_PREFIX + "upload/img",   
      method: "POST",    
      itemAlias: "file"
  });
  photoes :Array<string> = [];
  id: String = '';
  showLoading: boolean = false;
  constructor(public location: Location, private route: ActivatedRoute, private serve: WorkOrderService) {
    this.feedbackForm = new FormGroup({
      'action': new FormControl(this.feedback.action || ''),
      'photos': new FormControl(this.feedback.photos || []),
      'time': new FormControl(this.feedback.time || new Date().getTime())
    });
  }

  ngOnInit() {
    this.route.params.subscribe(({id}) => {
      this.id = id
    });
  }
  goback() {
    this.location.back();
  }
  postImg(e) {
    const index = this.uploader.queue.length-1;
    this.uploader.queue[index].upload();
    this.uploader.queue[index].onSuccess = (response, status, headers) => {    
      // 上传文件成功
      if (status == 200) {
          // 上传文件后获取服务器返回的数据
          let res = JSON.parse(response);
          if(res.success) {
            this.photoes = this.photoes.concat([`${WEB_URL_PREFIX}upload/getimg?imgurl=${res.data.http_path}`])
            let photos = this.feedbackForm.value.photos
            this.feedbackForm.patchValue({ photos: photos.concat(res.data.http_path) })
          }  
      }else {            
          // 上传文件后获取服务器返回的数据错误   
          layer.msg(response)
      }
    };
    return false
  }
  submitFeedback() {
    this.showLoading = layer.load('反馈中');
    this.feedbackForm.patchValue({ time: new Date().getTime() })
    this.serve.resloveOrder(this.id, this.feedbackForm.value).then(res => {
      layer.close(this.showLoading);
      this.showLoading = false;
      layer.msg(res.msg);
      if(res.success){
        this.location.back();
      }
    })
  }
}
