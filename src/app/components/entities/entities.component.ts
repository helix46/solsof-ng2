/// <reference path="../../../../node_modules/ag-grid/dist/ag-grid.d.ts" />
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {EntitiesService} from '../../services/entities/entities.service';
import {HelperService} from '../../services/helper/helper.service';
import { Router, RouterLink } from 'angular2/router';

import 'rxjs/Rx'; //for map



@Component({
    selector: 'entities',
    templateUrl: 'src/app/components/entities/entities.component.html',
    pipes: [],
    providers: [EntitiesService],
    directives: [(<any>window).ag.grid.AgGridNg2]
})

export class EntitiesComponent {
    title: string = 'Entities';
    public entities: SolsofSpa.Api.DataContext.tblEntity[] = [];
    public excludeInactive: boolean = true;

    constructor(public router: Router, private entitiesService: EntitiesService) {
        console.log('constructor EntitiesComponent');
    }
    ngOnInit() {
        this.loadEntities();
    }

    columnDefs: ag.grid.ColDef[] = [
        { headerName: "Id", field: "entityID", hide: true },
        { headerName: "Entity", field: "name" }
    ];

    onRowClicked(params: any) {
        var entity: SolsofSpa.Api.DataContext.tblEntity = <SolsofSpa.Api.DataContext.tblEntity>params.data;
        HelperService.getInstance().setEntityId(entity.entityID);
        console.log('');
    }

    onRowDoubleClicked(params: any) {
        this.onRowClicked(params);
        this.router.navigate(['LedgerAccounts']);
    }

    chkExcludeInactiveClicked(chkExcludeInactive: HTMLInputElement) {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadEntities();
    }

    //onGetEntitiesSuccess(entities: SolsofSpa.Api.DataContext.tblEntity[]) {
    //    this.entities = entities;
    //}

    logError(e: any) {
        console.log('getEntities Error');
    }
    complete() {
        console.log('getEntities complete');
    }

    saveEntities(data: SolsofSpa.Api.DataContext.tblEntity[]) {
        //this.gridOptions.rowData = data;
        this.entities = data;
    }

    loadEntities() {
        if (HelperService.getInstance().tokenIsValid()) {
            this.entitiesService.getEntities(this.excludeInactive).subscribe(data => this.entities = data, this.logError, this.complete);
        } else {
            this.router.navigate(['Login']);
        }
    }
}
