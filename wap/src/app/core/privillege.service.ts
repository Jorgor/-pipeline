import {Injectable} from '@angular/core';
import {LoginService} from '../routes/login/login.service';
import {UserService} from '../routes/login/user.service';

@Injectable()
export class PrivillegeService {

    constructor(private userService: UserService) {
    }

    private role;

    public checkPrivillege(privillgeId) {
        this.role = this.userService.role;
        let bool = false;
        this.role.map(v => {
            if (v == privillgeId) {
                bool = true;
            }
        })
        return bool;
    }

}
