import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {BaseService} from "../base.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../routes/login/user.service";

declare var $: any;

@Injectable()
export class SettingsService {

    public user: any;
    public app: any;
    public layout: any;
    public baiduAk: string = 'xxqsFRwXb2gEEeHXucH7mMKCCvz6GhXV';

    public static _unreadNewsNumber = 0;
    public set unreadNewsNumber(v) {
        SettingsService._unreadNewsNumber = v;
    }
    public get unreadNewsNumber() {
        return SettingsService._unreadNewsNumber;
    }

    constructor() {
        // User Settings
        // -----------------------------------
        this.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'assets/img/user/02.jpg'
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name: 'jialing',
            description: 'jialing',
            year: ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: false,
            isCollapsed: false,
            isAsideNone: true,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: true,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

    }

    createTag(url: string, className, func = null) {  //定义方法
        if ($('.' + className).length) {
            func.bind(this)();
            return;
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.className = className;
        script.onload = func.bind(this);
        document.body.appendChild(script);
    };

    scrollInit(namesString) {
        $(function () {
            $(namesString).niceScroll({
                cursorcolor: "#ccc",//#CC0071 光标颜色
                cursoropacitymax: .5, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                touchbehavior: true, //使光标拖动滚动像在台式电脑触摸设备
                cursorwidth: "5px", //像素光标的宽度
                cursorborder: "0", // 游标边框css定义
                cursorborderradius: "5px",//以像素为光标边界半径
                autohidemode: true, //是否隐藏滚动条
                overflowx: false,
            });
        });
    }

    getFormObj(domName) {
        let formData = $(domName).serializeArray();  //这个方法将表单的name生成对象数组，需要转换为json对象
        let obj = {};
        formData.forEach(item => {
            obj[item.name] = item.value;
        });
        return obj;
    }

    // 编码汉字,将对象对象里面的汉字编码后，再转换成urlencode格式
    encodeObj(obj) {
        let params = new URLSearchParams();
        for (let item in obj) {
            if (obj[item] != '' && !isNullOrUndefined(obj[item]))
                params.append(item, obj[item]);
        }
        return params.toString();
    }

    // 不做编码处理（应为走浏览器发送）
    joinObj(obj) {
        let params = [];
        for (let item in obj) {
            if (obj[item] != '' && !isNullOrUndefined(obj[item]))
                params.push('&' + item + '=' + obj[item]);
        }
        return params.join('');
    }

    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }


    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

}
