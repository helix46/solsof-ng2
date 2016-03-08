import {Response} from 'angular2/http';
import {Component, Input, Output, EventEmitter, ViewChild} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';
import {TransactionService} from '../../services/transaction/transaction.service';
import { Router, RouterLink} from 'angular2/router';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {TransactionLineComponent} from '../transactionline/transactionline.component';
//import {AgGridNg2} from 'ag-grid-ng2/main';
//import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'transactionModal',
    templateUrl: 'src/app/components/transaction/transaction.component.html',
    styles: ['.modalSolsofVisible {display: block;}'],
    providers: [TransactionService],
    directives: [(<any>window).ag.grid.AgGridNg2, TransactionLineComponent]
    //directives: [AgGridNg2, TransactionLineComponent]
})

export class TransactionComponent {
    constructor(private transactionService: TransactionService, private router: Router) {
        console.log('constructor transactionComponent');
    }

    editTransaction: boolean;
    titleTransaction: string;
    transactionTotal: string;
    getTransactionSuccess: boolean = true;
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    bankAccounts: SolsofSpa.Helper.tblBankAccountLite[];
    @Output() ok: EventEmitter<string> = new EventEmitter();

    transaction: SolsofSpa.Helper.structTransaction = {
        comment: '',
        debtorID: -1,
        entityID: -1,
        transactionID: -1,
        transactionLineArray: [],
        bankAccountID: -1,
        chequeNumber: -1,
        sTransactionDate: '',
        transactionType: SolsofSpa.Helper.enumTransactionType.Cheque
    };
    transactionVisible: boolean = false;

    ngOnInit() {

        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
    }

    calculateTransactionTotal = () => {
        var i: number;
        var total = 0;
        for (i = 0; i < this.transaction.transactionLineArray.length; i = i + 1) {
            total += this.transaction.transactionLineArray[i].amount
        }
        this.transactionTotal = HelperService.formatMoney(total);
    };

    newTransaction = (ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], transactionType: SolsofSpa.Helper.enumTransactionType) => {
        var newTransactionThis = this;
        if (HelperService.tokenIsValid()) {
            this.ledgerAccounts = ledgerAccounts;
            this.titleTransaction = 'Add Transaction';
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.transaction = {
                    comment: '',
                    debtorID: -1,
                    entityID: -1,
                    transactionID: -1,
                    transactionLineArray: [],
                    bankAccountID: -1,
                    chequeNumber: -1,
                    sTransactionDate: '',
                    transactionType: transactionType
                }
                this.gridOptions.api.setRowData(this.transaction.transactionLineArray);
            }
            this.editTransaction = false;
            this.getTransactionSuccess = true;
            this.calculateTransactionTotal();
            this.transactionVisible = true;
        } else {
            this.router.navigate(['Login']);
        }
    }

    getTransaction = (transactionID: number, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], bankAccounts: SolsofSpa.Helper.tblBankAccountLite[]) => {
        var getTransactionThis = this;
        if (HelperService.tokenIsValid()) {
            this.ledgerAccounts = ledgerAccounts;
            this.bankAccounts = bankAccounts;
            var EntityId = GetEntityService.getInstance().getEntityId();
            this.titleTransaction = 'Edit Transaction';
            this.transactionService.getTransaction(transactionID, EntityId).subscribe(onGetTransaction, logTransactionError);
        } else {
            this.router.navigate(['Login']);
        }
        function onGetTransaction(transaction: SolsofSpa.Helper.structTransaction) {
            getTransactionThis.editTransaction = true;
            getTransactionThis.transaction = transaction;
            getTransactionThis.gridOptions.api.setRowData(transaction.transactionLineArray);
            getTransactionThis.gridOptions.api.sizeColumnsToFit();
            getTransactionThis.getTransactionSuccess = true;
            getTransactionThis.calculateTransactionTotal();
            getTransactionThis.transactionVisible = true;
        }
        function logTransactionError() {
            console.log('getTransaction Error');
            getTransactionThis.getTransactionSuccess = false;
        }
    }

    //dropdowns are not currently updating model
    //onChangeDebtor = (value: any) => {
    //    var currentTarget: HTMLSelectElement = <HTMLSelectElement>event.currentTarget;
    //    this.transaction.debtorID = Number(currentTarget.value);
    //}

    cancelTransaction = () => {
        this.transactionVisible = false;
    }

    okClicked = () => {
        var okClickedThis = this;
        if (this.editTransaction) {
            if (HelperService.tokenIsValid()) {
                this.transactionService.updateTransaction(this.transaction).subscribe(updateTransactionSuccess, logError, complete);
                this.transactionVisible = false;
            } else {
                this.router.navigate(['Login']);
            }
        } else {
            if (HelperService.tokenIsValid()) {
                this.transactionService.saveNewTransaction(this.transaction).subscribe(updateTransactionSuccess, logError, complete);
            } else {
                this.router.navigate(['Login']);
            }
        }

        function logError(obj: any) {
            console.log(JSON.stringify(obj));
            alert(JSON.stringify(obj));
        }
        function complete() {
            console.log('transaction complete');
        }
        function updateTransactionSuccess(response: Response) {
            var transactionID: number = <number>response.json()
            okClickedThis.transactionVisible = false;
            okClickedThis.ok.emit('');
        }
    }


    ////////////////////////////////////
    //transactionLine
    ////////////////////////////////////
    selectedTransactionLineIndex: number;
    @ViewChild(TransactionLineComponent) transactionLineComponent: TransactionLineComponent;
    bEditTransactionLine: boolean;

    deleteTransactionLine = () => {
        this.transaction.transactionLineArray.splice(this.selectedTransactionLineIndex, 1);
        this.gridOptions.api.setRowData(this.transaction.transactionLineArray);
    }

    saveTransactionLine = (savededTransactionLine: SolsofSpa.Helper.structTransactionLine) => {
        if (this.bEditTransactionLine) {
            this.transaction.transactionLineArray[this.selectedTransactionLineIndex] = savededTransactionLine;
        } else {
            this.transaction.transactionLineArray.push(savededTransactionLine);
        };
        this.gridOptions.api.setRowData(this.transaction.transactionLineArray);
        this.calculateTransactionTotal();
    }

    newTransactionLine = () => {
        this.bEditTransactionLine = false;
        this.transactionLineComponent.newTransactionLine(this.ledgerAccounts);
    }

    ////////////////////////////////////
    //grid
    ////////////////////////////////////
    columnDefs: any[] = [
        { headerName: 'Ledger Account', field: 'ledgerAccountName' },
        { headerName: 'Amount', field: 'amount', cellClass: 'rightJustify', cellRenderer: (params: any) => { return HelperService.formatMoney(Number(params.value)); } },
        { headerName: 'Comment', field: 'comment' }
    ];
    onRowClicked = (params: any) => {
        //params.node.id seems to be index of data array (not row number!)
        this.selectedTransactionLineIndex = params.node.id;
    }
    onRowDoubleClicked = (params: any) => {
        var selectedTransactionLine = <SolsofSpa.Helper.structTransactionLine>params.data;
        this.bEditTransactionLine = true;
        this.transactionLineComponent.displayTransactionline(selectedTransactionLine, this.ledgerAccounts);
    }
    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}



