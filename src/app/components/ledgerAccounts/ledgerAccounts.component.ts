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
    title: string = 'Ledger Accounts';
    public LedgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[] = [];
    public excludeInactive: boolean = true;

    constructor(private ledgerAccountsService: LedgerAccountsService) {
        console.log('constructor LedgerAccountsComponent');
    }
    ngOnInit() {
        this.loadLedgerAccounts();
    }

    columnDefs: ag.grid.ColDef[] = [
        { headerName: "Id", field: "LedgerAccountID", hide: true },
        { headerName: "Name", field: "name", cellClass: "cellClass", minWidth: 100, maxWidth: 300 },
        { headerName: "Balance", field: "balance" },
        { headerName: "ledgerAccountType", field: "ledgerAccountType" },
        { headerName: "active", field: "active" },
    ];

    onSelect(entity: SolsofSpa.Api.DataContext.tblEntity) {
        alert(entity.name);
    }

    chkExcludeInactiveClicked(chkExcludeInactive: HTMLInputElement) {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadLedgerAccounts();
    }

    //onGetEntitiesSuccess(entities: SolsofSpa.Api.DataContext.tblEntity[]) {
    //    this.entities = entities;
    //}

    logError(e: any) {
        console.log('getLedgerAccounts Error');
    }
    complete() {
        console.log('getLedgerAccounts complete');
    }

    loadLedgerAccounts() {
        var obs = this.ledgerAccountsService.getLedgerAccounts(this.excludeInactive);
        if (obs !== null) {
            obs.subscribe(data => this.LedgerAccounts = data, this.logError, this.complete);
        }


    };
}