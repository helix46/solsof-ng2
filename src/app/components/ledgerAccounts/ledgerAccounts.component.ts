import {Router} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {LedgerAccountsService} from '../../services/LedgerAccounts/LedgerAccounts.service';
//import 'rxjs/Rx'; //for map



@Component({
    selector: 'ledger-accounts',
    templateUrl: 'src/app/components/LedgerAccounts/LedgerAccounts.component.html',
    pipes: [],
    providers: [LedgerAccountsService],
    directives: [(<any>window).ag.grid.AgGridNg2]
})

export class LedgerAccountsComponent {

    public LedgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[] = [];
    public excludeInactive: boolean = true;

    constructor(private ledgerAccountsService: LedgerAccountsService, public router: Router) {
        console.log('constructor LedgerAccountsComponent');
        window.onresize = () => {
            this.gridOptions.api.sizeColumnsToFit();
            //HelperService.getInstance().autoSizeAll(this.columnDefs, this.gridOptions);
        };
    }
    ngOnInit() {
        this.loadLedgerAccounts();
    }
    selectedLedgerAccount: SolsofSpa.Api.DataContext.tblLedgerAccount;

    chkExcludeInactiveClicked(chkExcludeInactive: HTMLInputElement) {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadLedgerAccounts();
    }

    //////////////////////////////////////////////////////////////
    //get data
    logError(e: any) {
        console.log('getLedgerAccounts Error');
    }

    complete() {
        console.log('getLedgerAccounts complete');
    }

    onGetLedgerAccountsSuccess = (data: SolsofSpa.Api.DataContext.tblLedgerAccount[]) => {
        this.LedgerAccounts = data;
        this.gridOptions.api.setRowData(data);
        //HelperService.getInstance().autoSizeAll(this.columnDefs, this.gridOptions);
        this.gridOptions.api.sizeColumnsToFit();
    }

    loadLedgerAccounts() {
        //var LedgerAccountsComponentThis = this;

        if (HelperService.getInstance().tokenIsValid()) {
            var EntityId = HelperService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.ledgerAccountsService.getLedgerAccounts(this.excludeInactive, EntityId).subscribe(this.onGetLedgerAccountsSuccess, this.logError, this.complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
    };
     
    /////////////////////////////////////////////////////////////
    //grid
    columnDefs: ag.grid.ColDef[] = [
        { headerName: "Id", field: "LedgerAccountID", hide: true },
        { headerName: "Name", field: "name", minWidth: 100 },
        {
            headerName: "Bal.",
            field: "balance",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.getInstance().noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
            },
            minWidth: 80
        },
        { headerName: "Type", field: "ledgerAccountType" },
        { headerName: "Active", field: "active" },
    ];

    onRowClicked(params: any) {
        this.selectedLedgerAccount = <SolsofSpa.Api.DataContext.tblLedgerAccount>params.data;
        console.log('LedgerAccount onRowClicked');
    }

    onRowDoubleClicked = (params: any) => {
        this.onRowClicked(params);
        this.router.navigate(['Transactions', { ledgerAccountID: this.selectedLedgerAccount.ledgerAccountID }]);
    }

    gridOptions: ag.grid.GridOptions = HelperService.getInstance().getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}