import {Paginator} from "./paginator.domain";

export class ApiPage<T> {
    data: T;
    page: Paginator;
}
