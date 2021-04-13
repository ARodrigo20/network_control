import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    

    constructor(
        private router: Router,
        public gS: GeneralService,
        private _route: ActivatedRoute,
    ) {}

    ngOnInit() {
        // var title = this._route.snapshot.data['title']
        // console.log("titulo :", title)
        // var menu_item : MenuItem = { label: title }
        // this.items = [];
        // this.items = [
        //     menu_item,
        // ];
        // this.home = {icon: 'pi pi-home', url: '#'};
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
