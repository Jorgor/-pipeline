/**
 *    巡检员
 */

import {Coordinate} from "./coordinate.domain";
import {PipelinePoint} from "./pipelinePoint.domain";

export class Cesspool  {
    id:string;
    serialNumber:string;
    coordinate:Coordinate=new Coordinate();
    vertexes:PipelinePoint[]=[];
    feature:string;
}
