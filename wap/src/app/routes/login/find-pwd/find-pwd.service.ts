import {BaseService} from "../../../core/base.service";
import {ApiResponse} from "../../../../../../wap/src/app/domain/api-response.domain";

declare const $: any;
declare const layer: any;


export class FindPwdService extends BaseService {

    public sendYzm(mobile): Promise<ApiResponse<string>> {
        return this.get(`user/reset-password/verification-code/${mobile}`);
    }

    public findPwd(form: any): Promise<any> {
        return this.post('user/reset-password',form);
    }
}
