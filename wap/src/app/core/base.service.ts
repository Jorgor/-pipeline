import {Injectable} from "@angular/core";
import {WEB_URL_PREFIX} from "../../assets/server/http-link.data";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../routes/login/user.service";
import {LoginService} from "../routes/login/login.service";

declare var $: any;

@Injectable()
export class BaseService {

    constructor(private http: HttpClient, protected userService: UserService) {
    }

    private fixUrl(url) {
        return url.replace(/\/&/g, '/').replace(/\?&/g, '?');
    }

    private getHeaders(needContentType: boolean): HttpHeaders {
        let headers: any = {};
        if (this.userService.user)
            headers['Authorization'] = 'Bearer ' + this.userService.token;
        if (needContentType)
            headers['Content-Type'] = 'application/json';
        return new HttpHeaders(headers);
    }

    public get(url: string): Promise<any> {
        let u = this.fixUrl(WEB_URL_PREFIX + url);
        return this.http.get(u, {headers: this.getHeaders(false)}).toPromise()
            .catch(this.handleError);
    }

    public getimg(url: string) {
        let u = this.fixUrl(WEB_URL_PREFIX + url);
        return this.http.get(u, {headers: this.getHeaders(false)}).pipe();
    }

    public put(url: string, data: any): Promise<any> {
        let u = this.fixUrl(WEB_URL_PREFIX + url);
        return this.http.put(u, data, {headers: this.getHeaders(true), params: data, withCredentials: true}).toPromise()
            .catch(this.handleError);
    }

    public post(url: string, data: any): Promise<any> {
        let u = this.fixUrl(WEB_URL_PREFIX + url);
        return this.http.post(u, data, {headers: this.getHeaders(true), params: data, withCredentials: true}).toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);   // for demo purposes only
        return Promise.reject(error.message || error);
    }
    public delete(url: string): Promise<any> {
        let u = this.fixUrl(WEB_URL_PREFIX + url);
        return this.http.delete(u, {headers: this.getHeaders(true)}).toPromise()
            .catch(this.handleError);
    }

    public exportFile(url: string, fileName: string): Promise<any> {
        return this.http.get<any>(this.fixUrl(WEB_URL_PREFIX + url), {responseType: 'blob' as 'json'}).toPromise()
            .catch(this.handleError).then(res => {
            //获取文件流转换成请求，并在浏览器中打开，不需要返回
            var blob = new Blob([res], {type: "application/vnd.ms-excel"});
            var objectUrl = window.URL.createObjectURL(blob);
            var anchor = document.createElement("a");
            anchor.download = fileName;
            anchor.href = objectUrl;
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            anchor.dispatchEvent(evt);
        });
    }
}
