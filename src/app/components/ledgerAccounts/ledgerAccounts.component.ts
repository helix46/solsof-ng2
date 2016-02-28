import {Router} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {LedgerAccountsService} from '../../services/LedgerAccounts/LedgerAccounts.service';
//import {AgGridNg2} from 'ag-grid-ng2/main';
//import {GridOptions} from 'ag-grid/main';



@Component({
    selector: 'ledger-accounts',
    templateUrl: 'src/app/components/LedgerAccounts/LedgerAccounts.component.html',
    pipes: [],
    providers: [LedgerAccountsService],
    directives: [(<any>window).ag.grid.AgGridNg2]
    //directives: [AgGridNg2]
})

export class LedgerAccountsComponent {

    public LedgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[] = [];
    public excludeInactive: boolean = true;
    getLedgerAccountsSuccess: boolean = true;

    constructor(private ledgerAccountsService: LedgerAccountsService, public router: Router) {
        console.log('constructor LedgerAccountsComponent');
        this.getLedgerAccountsSuccess = true;
        window.onresize = () => {
            //this.gridOptions.api.sizeColumnsToFit();
        };
    }
    ngOnInit() {
        this.loadLedgerAccounts();
    }
    selectedLedgerAccount: SolsofSpa.Api.DataContext.tblLedgerAccount;

    chkExcludeInactiveClicked = (chkExcludeInactive: HTMLInputElement) => {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadLedgerAccounts();
    }

    //////////////////////////////////////////////////////////////
    //get data
    loadLedgerAccounts = () => {
        var loadLedgerAccountsThis = this;
        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.ledgerAccountsService.getLedgerAccounts(this.excludeInactive, EntityId).subscribe(onGetLedgerAccountsSuccess, logError, complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
        function logError(e: any) {
            console.log('getLedgerAccounts Error');
            loadLedgerAccountsThis.getLedgerAccountsSuccess = false;
        }

        function complete() {
            console.log('getLedgerAccounts complete');
        }

        function onGetLedgerAccountsSuccess(data: SolsofSpa.Api.DataContext.tblLedgerAccount[]) {
            loadLedgerAccountsThis.getLedgerAccountsSuccess = true;
            loadLedgerAccountsThis.LedgerAccounts = data;
            loadLedgerAccountsThis.gridOptions.api.setRowData(data);
            loadLedgerAccountsThis.gridOptions.api.sizeColumnsToFit();
        }
    };
     
    /////////////////////////////////////////////////////////////
    //grid
    columnDefs: any[] = [
        { headerName: "Id", field: "LedgerAccountID", hide: true },
        { headerName: "Name", field: "name", minWidth: 100 },
        {
            headerName: "Bal.",
            field: "balance",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.formatMoney(params.value);
            },
            minWidth: 80
        },
        { headerName: "Type", field: "ledgerAccountType" },
        { headerName: "Active", field: "active" },
    ];

    onRowClicked = (params: any) => {
        this.selectedLedgerAccount = <SolsofSpa.Api.DataContext.tblLedgerAccount>params.data;
        console.log('LedgerAccount onRowClicked');
    }

    onRowDoubleClicked = (params: any) => {
        this.onRowClicked(params);
        this.router.navigate(['Transactions', { ledgerAccountID: this.selectedLedgerAccount.ledgerAccountID }]);
    }

    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}