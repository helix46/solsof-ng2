import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Router, RouteParams} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {Response} from 'angular2/http';
import {Component, ViewChild} from 'angular2/core';
import {TransactionsService} from '../../services/Transactions/Transactions.service';
import {TransactionService} from '../../services/transaction/transaction.service';
import {TransactionComponent} from '../Transaction/Transaction.component';
import {LedgerAccountsService} from '../../services/LedgerAccounts/LedgerAccounts.service';
import {BankAccountsService} from '../../services/bankAccounts/bankAccounts.service';
import {DialogBoxComponent} from '../utilities/dialogBox/dialogBox.component';




@Component({
    selector: 'transaction',
    templateUrl: 'src/app/components/transactions/transactions.component.html',
    pipes: [],
    providers: [TransactionsService, LedgerAccountsService, BankAccountsService, TransactionService],
    //directives: [(<any>window).ag.grid.AgGridNg2, TransactionComponent, DialogBoxComponent]
    directives: [AgGridNg2, TransactionComponent, DialogBoxComponent]
})

export class TransactionsComponent {


    constructor(private TransactionsService: TransactionsService, private router: Router, private routeParams: RouteParams, private ledgerAccountsService: LedgerAccountsService, private bankAccountsService: BankAccountsService, private transactionService: TransactionService) {
        console.log('constructor TransactionsComponent');
        this.listDateDescending = true;
        window.onresize = () => {
            this.gridOptions.api.sizeColumnsToFit();
        };
    }

    public Transactions: SolsofSpa.Api.DataContext.tblTransaction[] = [];
    getTransactionsError: boolean = false;
    ledgerAccountID: number;
    editTransaction: boolean;
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    bankAccounts: SolsofSpa.Helper.tblBankAccountLite[];
    transactionsTitle: string;
    selectedTransaction: SolsofSpa.Api.DataContext.spGetTransactionList_Result;
    @ViewChild(TransactionComponent) transactionComponent: TransactionComponent;
    @ViewChild(DialogBoxComponent) dialogBoxComponent: DialogBoxComponent;

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
        this.transactionsTitle = 'Transactions - ' + HelperService.getLedgerAccountName(this.ledgerAccountID, this.ledgerAccounts);
    }

    onLoadBankAccountsSuccess = (structLoadTransactionForm: SolsofSpa.Helper.structLoadTransactionForm) => {
        this.bankAccounts = structLoadTransactionForm.bankAccounts;
    }

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

    addCheque = () => {
        this.transactionComponent.newTransaction(this.ledgerAccounts, SolsofSpa.Helper.enumTransactionType.Cheque, this.bankAccounts);
        this.editTransaction = true;
    }
    addDeposit = () => {
        this.transactionComponent.newTransaction(this.ledgerAccounts, SolsofSpa.Helper.enumTransactionType.Deposit, this.bankAccounts);
        this.editTransaction = true;
    }
    addGeneralJournal = () => {
        this.transactionComponent.newTransaction(this.ledgerAccounts, SolsofSpa.Helper.enumTransactionType.GeneralJournal, this.bankAccounts);
        this.editTransaction = true;
    }

    copyTransaction = () => {
        if (this.selectedTransaction === undefined) {
            alert('Please chooose a transaction to copy');
        } else {
            this.transactionComponent.getTransaction(this.selectedTransaction.transactionID, this.ledgerAccounts, this.bankAccounts, true);
            this.editTransaction = false;
        }
    }

    deleteTransaction = () => {
        var deleteTransactionThis = this;
        var selectedRows: SolsofSpa.Api.DataContext.spGetTransactionList_Result[] = deleteTransactionThis.gridOptions.api.getSelectedRows();
        if (selectedRows.length > 0) {
            this.dialogBoxComponent.displayDialogBox('Are you sure you want to delete this Transaction?', deleteTransactionConfirmed);
        } else {
            this.dialogBoxComponent.alert('Please select a Transaction to delete');
        }
        function deleteTransactionConfirmed() {
            if (HelperService.tokenIsValid()) {
                var obs = deleteTransactionThis.transactionService.deleteTransaction(selectedRows[0].transactionID);
                obs.subscribe(onDeleteTransactionSuccess, err=> logTransactionsError(err), complete)
            } else {
                deleteTransactionThis.router.navigate(['Login']);
            }
            function onDeleteTransactionSuccess() {
                deleteTransactionThis.loadTransactions()
            }
            function logTransactionsError(err: any) {
                console.log('deleteTransaction Error');
            }
            function complete() {
                console.log('loadTransactions complete');
            }
        }
    }

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

    onRowClicked = (params: any) => {
        this.selectedTransaction = <SolsofSpa.Api.DataContext.spGetTransactionList_Result>params.data;
        //do nothing
    }

    onRowDoubleClicked = (params: any) => {
        var selectedTransaction = <SolsofSpa.Api.DataContext.spGetTransactionList_Result>params.data;
        this.transactionComponent.getTransaction(selectedTransaction.transactionID, this.ledgerAccounts, this.bankAccounts, false);
        this.editTransaction = true;
    }


    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}