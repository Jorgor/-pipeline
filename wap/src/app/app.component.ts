import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    ngOnInit() {
        $(document).on('click', '[href="#"]', e => e.preventDefault());
    }

}
