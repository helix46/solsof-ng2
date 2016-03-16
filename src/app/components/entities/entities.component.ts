import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {EntitiesService} from '../../services/entities/entities.service';
import {HelperService} from '../../services/helper/helper.service';
import { Router, RouterLink } from 'angular2/router';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'entities',
    templateUrl: 'src/app/components/entities/entities.component.html',
    pipes: [],
    providers: [EntitiesService],
    directives: [AgGridNg2]
})

export class EntitiesComponent {
    title: string = 'Entities';
    public entities: SolsofSpa.Api.DataContext.tblEntity[] = [];
    public excludeInactive: boolean = true;
    selectedEntity: SolsofSpa.Api.DataContext.tblEntity;
    getEntitiesError: boolean;

    constructor(public router: Router, private entitiesService: EntitiesService) {
        console.log('constructor EntitiesComponent');
        this.getEntitiesError = false;
    }

    ServiceBase: string;

    //load entities when page loaded
    ngOnInit() {
        this.loadEntities();
        this.ServiceBase = HelperService.getServiceBase();
    }

    //reload grid when checkbox clicked
    chkExcludeInactiveClicked = (chkExcludeInactive: HTMLInputElement) => {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadEntities();
    }

    //////////////////////////////////////////////
    //get data

    loadEntities = () => {
        var loadEntitiesThis = this;
        if (HelperService.tokenIsValid()) {
            this.entitiesService.getEntities(this.excludeInactive).subscribe(onGetEntitiesSuccess, logError, complete);
        } else {
            this.router.navigate(['Login']);
        }
        function logError(e: any) {
            console.log('getEntities Error');
            loadEntitiesThis.getEntitiesError = true;
        }
        function complete() {
            console.log('getEntities complete');
        }

        function onGetEntitiesSuccess(data: any) {
            loadEntitiesThis.entities = data;
            loadEntitiesThis.gridOptions.api.setRowData(data);
            loadEntitiesThis.gridOptions.api.sizeColumnsToFit();
            loadEntitiesThis.getEntitiesError = false;
        }
    }

    //////////////////////////////////////////////
    //grid
    columnDefs: any[] = [
        { headerName: "Id", field: "entityID", hide: true },
        { headerName: "Entity", field: "name" }
    ];

    onRowDoubleClicked = (params: any) => {
        this.onRowClicked(params);
        this.router.navigate(['LedgerAccounts']);
    }

    onRowClicked = (params: any) => {
        var entity: SolsofSpa.Api.DataContext.tblEntity = <SolsofSpa.Api.DataContext.tblEntity>params.data;
        GetEntityService.getInstance().setEntityId(entity.entityID);
        console.log('onRowClicked');
    }

    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}
