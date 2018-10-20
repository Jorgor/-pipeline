export class Paginator {

    pageNo: number;
    pageSize: number;
    totalResults: number;

    constructor(pageNo: number, pageSize: number) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }

}
