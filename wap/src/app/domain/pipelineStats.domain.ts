import {DataStats} from "./dataStats.domain";

/**
 *	管线统计
 */
export class PipelineStats extends DataStats{

    /**
     * 材质
     */
    material: DataStats[];

    /**
     * 管径
     */
    diameter: DataStats[];

}
