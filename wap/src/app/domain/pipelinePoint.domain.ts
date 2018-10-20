import {Coordinate} from "./coordinate.domain";
import {Elevation} from "./elevation.domain";

export class PipelinePoint {

    id: number;
    serialNumber: string; //井点编号
    feature: string; //特征
    attachment: string; //附属物
    coordinate: Coordinate; //坐标
    elevation: Elevation; //高程
    ground: number; //地面高度

}
