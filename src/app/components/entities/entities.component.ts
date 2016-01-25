/// <reference path="../../../../node_modules/ag-grid/dist/ag-grid.d.ts" />
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {EntitiesService} from '../../services/entities/entities.service';
import {HelperService} from '../../services/helper/helper.service';
import { Router, RouterLink } from 'angular2/router';


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
    selectedEntity: SolsofSpa.Api.DataContext.tblEntity;

    constructor(public router: Router, private entitiesService: EntitiesService) {
        console.log('constructor EntitiesComponent');
    }
    
    //load entities when page loaded
    ngOnInit() {
        this.loadEntities();
    }

    //reload grid when checkbox clicked
    chkExcludeInactiveClicked(chkExcludeInactive: HTMLInputElement) {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadEntities();
    }

    //////////////////////////////////////////////
    //get data
    logError(e: any) {
        console.log('getEntities Error');
    }
    complete() {
        console.log('getEntities complete');
    }

    onGetEntitiesSuccess = (data: any) => {
        this.entities = data;
        this.gridOptions.api.setRowData(data);
        this.gridOptions.api.sizeColumnsToFit();
    }

    loadEntities() {
        if (HelperService.getInstance().tokenIsValid()) {
            this.entitiesService.getEntities(this.excludeInactive).subscribe(this.onGetEntitiesSuccess, this.logError, this.complete);
        } else {
            this.router.navigate(['Login']);
        }
    }

    //////////////////////////////////////////////
    //grid
    columnDefs: ag.grid.ColDef[] = [
        { headerName: "Id", field: "entityID", hide: true },
        { headerName: "Entity", field: "name" }
    ];

    onRowDoubleClicked = (params: any) => {
        this.onRowClicked(params);
        this.router.navigate(['LedgerAccounts']);
    }

    onRowClicked(params: any) {
        var entity: SolsofSpa.Api.DataContext.tblEntity = <SolsofSpa.Api.DataContext.tblEntity>params.data;
        HelperService.getInstance().setEntityId(entity.entityID);
        console.log('onRowClicked');
    }

    gridOptions: ag.grid.GridOptions = HelperService.getInstance().getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}
