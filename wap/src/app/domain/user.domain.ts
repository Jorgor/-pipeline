import {Role} from "./role.domain";

export class User {

    id: number = 0;
    loginName: string = ''; //登陆名
    realName: string = ''; //真实姓名
    mobile: string = ''; //电话
    password: string = ''; //密码
    role: Role = new Role(); //所属角色
    token: string = '';

}
