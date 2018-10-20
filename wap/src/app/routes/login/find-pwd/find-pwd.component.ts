import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {LoginService} from "../login.service";
import {FindPwdService} from "./find-pwd.service";
import {Router} from "@angular/router";

declare const layer: any;

@Component({
    selector: 'app-find-password',
    templateUrl: './find-pwd.component.html',
    styleUrls: ['./find-pwd.component.scss']
})
export class FindPwdComponent implements OnInit, OnDestroy {

    public valForm: FormGroup;
    public leftTime: number = 60;
    public leftWord: string = '点击发送';
    public timeCount;
    private encrypt: string = '';

    constructor(private router: Router, private findPwdService: FindPwdService) {
        let phoneReg = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\\d{8}$";
        let passReg = "^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$";
        let password = new FormControl('', [Validators.required, Validators.pattern(passReg)]);
        let certainPassword = new FormControl('', CustomValidators.equalTo(password));
        this.valForm = new FormGroup({
            'mobile': new FormControl('', [Validators.required, Validators.pattern(phoneReg)]),
            'password': password,
            'passwordCertain': certainPassword,
            'code': new FormControl('', [Validators.required]),
        });
    }

    public submitForm($ev, form: any) {
        $ev.preventDefault();
        if (!form.valid) {
            layer.msg('请将信息填写完整！');
            return;
        }
        if (this.encrypt == '') {
            layer.msg('请重新获取验证码！');
            return;
        }
        form.value.encrypt = this.encrypt;
        this.findPwdService.findPwd(form.value)
            .then(res => {
                layer.msg(res.msg);
                if (res.success) {
                    this.router.navigate(['/login']);
                }
            });

    }

    public getYzm() {
        if (!this.valForm.controls.mobile.valid) {
            layer.msg('请填写正确的手机号码！');
            return;
        }
        if (this.leftWord != '点击发送') return;

        this.findPwdService.sendYzm(this.valForm.value.mobile).then((res) => {
            layer.msg(res.msg);
            if (res.success) {
                this.encrypt = res.data;
                this.countBegin(this.leftTime);
            }
        });
    }

    public get checkCountBegin() {
        if (this.leftWord != '点击发送') {
            return true;
        }
        return false;
    }

    public countBegin(time) {
        if (time <= 0) {
            this.leftWord = '点击发送';
            return
        }
        time--;
        this.leftWord = time + 's后重发'
        this.timeCount = setTimeout(() => {
            this.countBegin(time);
        }, 1000)
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
