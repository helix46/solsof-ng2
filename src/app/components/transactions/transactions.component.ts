//import {AgGridNg2} from 'ag-grid-ng2/main';
//import {GridOptions} from 'ag-grid/main';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Router, RouteParams} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {Response} from 'angular2/http';
import {Component, ViewChild} from 'angular2/core';
import {TransactionsService} from '../../services/Transactions/Transactions.service';
import {TransactionComponent} from '../Transaction/Transaction.component';
import {LedgerAccountsService} from '../../services/LedgerAccounts/LedgerAccounts.service';
import {BankAccountsService} from '../../services/bankAccounts/bankAccounts.service';




@Component({
    selector: 'transaction',
    templateUrl: 'src/app/components/transactions/transactions.component.html',
    pipes: [],
    providers: [TransactionsService, LedgerAccountsService, BankAccountsService],
    directives: [(<any>window).ag.grid.AgGridNg2, TransactionComponent]
    //directives: [AgGridNg2]
})

export class TransactionsComponent {


    constructor(private TransactionsService: TransactionsService, private router: Router, private routeParams: RouteParams, private ledgerAccountsService: LedgerAccountsService, private bankAccountsService: BankAccountsService) {
        console.log('constructor TransactionsComponent');
        this.listDateDescending = true;
        window.onresize = () => {
            //this.gridOptions.api.sizeColumnsToFit();
        };
    }

    public Transactions: SolsofSpa.Api.DataContext.tblTransaction[] = [];
    getTransactionsError: boolean = false;
    ledgerAccountID: number;
    editTransaction: boolean;
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    bankAccounts: SolsofSpa.Helper.tblBankAccountLite[];
    @ViewChild(TransactionComponent) transactionComponent: TransactionComponent;

    ngOnInit() {
        this.ledgerAccountID = Number(this.routeParams.get('ledgerAccountID'));
        this.loadTransactions();
        HelperService.loadLedgerAccounts(this.router, this.ledgerAccountsService, this.onLoadLedgerAccountsError, this.onLoadLedgerAccountsSuccess);
        HelperService.loadBankAccounts(this.router, this.bankAccountsService, this.onLoadBankAccountsError, this.onLoadBankAccountsSuccess);
    }

    onLoadBankAccountsError = () => {
        console.log('onLoadBankAccountsError');
    }

    onLoadLedgerAccountsError = () => {
        console.log('onLoadLedgerAccountsError ');
    }

    onLoadLedgerAccountsSuccess = (ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) => {
        this.ledgerAccounts = ledgerAccounts;
    }

    onLoadBankAccountsSuccess = (structLoadTransactionForm: SolsofSpa.Helper.structLoadTransactionForm) => {
        this.bankAccounts = structLoadTransactionForm.bankAccounts;
    }

    selectedTransaction: SolsofSpa.Api.DataContext.tblTransaction;
    listDateDescending: boolean;
    chkListDateDescendingClicked(chkListDateDescending: HTMLInputElement) {
        this.listDateDescending = chkListDateDescending.checked;
        this.loadTransactions();
    }

    //////////////////////////////////////////////////////////////
    //get data

    loadTransactions() {
        var loadTransactionsThis = this;
        //var TransactionsComponentThis = this;

        if (HelperService.tokenIsValid()) {
            var entityID = GetEntityService.getInstance().getEntityId();
            if (entityID === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.TransactionsService.getTransactions(entityID, this.ledgerAccountID, this.listDateDescending).subscribe(onGetTransactionsSuccess, logError, complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
        function logError(e: any) {
            console.log('getTransactions Error');
        }

        function complete() {
            console.log('getTransactions complete');
        }

        function onGetTransactionsSuccess(data: SolsofSpa.Api.DataContext.tblTransaction[]) {
            loadTransactionsThis.Transactions = data;
            loadTransactionsThis.gridOptions.api.setRowData(data);
            loadTransactionsThis.gridOptions.api.sizeColumnsToFit();
            loadTransactionsThis.getTransactionsError = false;
        }
    };
     
    /////////////////////////////////////////////////////////////
    //grid
    columnDefs: any[] = [
        { headerName: "transactionID", field: "transactionID", hide: true },
        {
            headerName: "Date",
            field: "transactionDate",
            cellRenderer: function (params: any) {
                return HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
            },
            cellClass: 'rightJustify',
        },
        { headerName: "Comment", field: "comment" },
        { headerName: "Type", field: "transactionType" },
        {
            headerName: "Amount",
            field: "amount",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            minWidth: 80
        },
        {
            headerName: "Total",
            field: "total",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            minWidth: 80
        }
    ];

    onRowClicked(params: any) {
        //do nothing
    }

    onRowDoubleClicked = (params: any) => {
        var selectedTransaction = <SolsofSpa.Api.DataContext.spGetTransactionList_Result>params.data;
        this.transactionComponent.getTransaction(selectedTransaction.transactionID, this.ledgerAccounts, this.bankAccounts);
        this.editTransaction = true;
    }

    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}