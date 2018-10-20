import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import {Paginator} from "../../domain/paginator.domain";

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {

	@Input() set paginator(value: Paginator){
		this._paginator = value;
	}

	@Output() pageChange = new EventEmitter();

	public maxSize: number = 10;
	private _paginator: Paginator = new Paginator(1,10);

	get paginator(){
		return this._paginator;
	}

	public pageChanged(event: any): void {
	    if(event){
            this._paginator.pageNo = event.page;
        }
		this.pageChange.emit(this._paginator);
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {}

}
