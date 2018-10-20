import {User} from "./user.domain";
import {Coordinate} from "./coordinate.domain";

/**
 *    巡检员
 */
export class Patroller extends User {
    coordinate: Coordinate; //坐标
    locationTime: Date;  //定位时间
}
