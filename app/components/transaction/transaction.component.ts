import {Response} from '@angular/http';
import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {HelperService} from '../../services/helper/helper.service';
import {TransactionService} from '../../services/transaction/transaction.service';
import { Router, RouterLink} from '@angular/router-deprecated';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {TransactionLineComponent} from '../transactionline/transactionline.component';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'transactionModal',
    templateUrl: 'app/components/transaction/transaction.component.html',
    styles: ['.modalSolsofVisible {display: block;}'],
    providers: [TransactionService],
    //directives: [(<any>window).ag.grid.AgGridNg2, TransactionLineComponent]
    directives: [AgGridNg2, TransactionLineComponent]
})

export class TransactionComponent {
    constructor(private transactionService: TransactionService, private router: Router) {
        HelperService.log('constructor transactionComponent');
    }

    editTransaction: boolean;
    titleTransaction: string;
    transactionTotal: string;
    bankAccountDisabled: boolean;
    getTransactionSuccess: boolean = true;
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    bankAccounts: SolsofSpa.Helper.tblBankAccountLite[];
    @Output() ok: EventEmitter<string> = new EventEmitter<string>();

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
            if (this.transaction.transactionLineArray[i].debit) {
                total += this.transaction.transactionLineArray[i].amount
            } else {
                total -= this.transaction.transactionLineArray[i].amount
            }
        }
        this.transactionTotal = HelperService.formatMoney(total);
    };

    newTransaction = (ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], transactionType: SolsofSpa.Helper.enumTransactionType,  bankAccounts: SolsofSpa.Helper.tblBankAccountLite[]) => {
        this.selectedTransactionLineIndex = -1;
        var newTransactionThis = this;
        if (HelperService.tokenIsValid()) {
            this.ledgerAccounts = ledgerAccounts;
            this.bankAccounts = bankAccounts;
            switch (transactionType) {
                case SolsofSpa.Helper.enumTransactionType.Cheque:
                    this.titleTransaction = 'Add Cheque';
                    this.bankAccountDisabled = false;
                    break;
                case SolsofSpa.Helper.enumTransactionType.Deposit:
                    this.titleTransaction = 'Add Deposit';
                    this.bankAccountDisabled = false;
                    break;
                case SolsofSpa.Helper.enumTransactionType.GeneralJournal:
                    this.titleTransaction = 'Add General Journal';
                    this.bankAccountDisabled = true;
                    break;

            }
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.transaction = {
                    comment: '',
                    debtorID: -1,
                    entityID: EntityId,
                    transactionID: -1,
                    transactionLineArray: [],
                    bankAccountID: -1,
                    chequeNumber: -1,
                    sTransactionDate: HelperService.formatDateForJSon(new Date()),
                    transactionType: transactionType
                }
                this.gridOptions.api.setRowData(this.transaction.transactionLineArray);
                this.selectedTransactionLineIndex = -1;
            }
            this.editTransaction = false;
            this.getTransactionSuccess = true;
            this.calculateTransactionTotal();
            this.transactionVisible = true;
        } else {
            this.router.navigate(['Login']);
        }
    }

    getTransaction = (transactionID: number, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], bankAccounts: SolsofSpa.Helper.tblBankAccountLite[], copyTransaction: boolean) => {
        var getTransactionThis = this;
        getTransactionThis.editTransaction = !copyTransaction;
        if (HelperService.tokenIsValid()) {
            this.ledgerAccounts = ledgerAccounts;
            this.bankAccounts = bankAccounts;
            var EntityId = GetEntityService.getInstance().getEntityId();
            this.transactionService.getTransaction(transactionID, EntityId).subscribe(onGetTransaction, logTransactionError);
        } else {
            this.router.navigate(['Login']);
        }
        function onGetTransaction(transaction: SolsofSpa.Helper.structTransaction) {
            getTransactionThis.transaction = transaction;
            getTransactionThis.gridOptions.api.setRowData(transaction.transactionLineArray);
            getTransactionThis.gridOptions.api.sizeColumnsToFit();
            this.selectedTransactionLineIndex = -1;
            getTransactionThis.getTransactionSuccess = true;
            getTransactionThis.calculateTransactionTotal();
            getTransactionThis.transactionVisible = true;
            var verb: string;
            if (copyTransaction) {
                verb = 'Copy ';
            } else {
                verb = 'Edit ';
            }
            switch (transaction.transactionType) {
                case SolsofSpa.Helper.enumTransactionType.Cheque:
                    getTransactionThis.titleTransaction = verb + 'Cheque';
                    getTransactionThis.bankAccountDisabled = false;
                    break;
                case SolsofSpa.Helper.enumTransactionType.Deposit:
                    getTransactionThis.titleTransaction = verb + ' Deposit';
                    getTransactionThis.bankAccountDisabled = false;
                    break;
                case SolsofSpa.Helper.enumTransactionType.GeneralJournal:
                    getTransactionThis.titleTransaction = verb + ' General Journal';
                    getTransactionThis.bankAccountDisabled = true;
                    break;
                case SolsofSpa.Helper.enumTransactionType.Invoice:
                    getTransactionThis.titleTransaction = verb + ' Invoice';
                    getTransactionThis.bankAccountDisabled = true;
                    break;
                case SolsofSpa.Helper.enumTransactionType.PayInvoice:
                    getTransactionThis.titleTransaction = verb + ' Pay Invoice';
                    getTransactionThis.bankAccountDisabled = true;
                    break;

            }
        }
        function logTransactionError() {
            HelperService.log('getTransaction Error');
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
            HelperService.log(obj);
            HelperService.log(JSON.stringify(obj));
        }
        function complete() {
            HelperService.log('transaction complete');
        }
        function updateTransactionSuccess(response: Response) {
            HelperService.log('updateTransactionSuccess');
            okClickedThis.transactionVisible = false;
            okClickedThis.ok.emit('');
        }
    }


    ////////////////////////////////////
    //transactionLine
    ////////////////////////////////////
    selectedTransactionLineIndex: number = -1;
    @ViewChild(TransactionLineComponent) transactionLineComponent: TransactionLineComponent;
    bEditTransactionLine: boolean;

    deleteTransactionLine = () => {
        if (this.selectedTransactionLineIndex === -1) {
            alert('Please choose a line to delete');
        } else {
            this.transaction.transactionLineArray.splice(this.selectedTransactionLineIndex, 1);
            this.gridOptions.api.setRowData(this.transaction.transactionLineArray);
            this.selectedTransactionLineIndex = -1;
        }
    }

    saveTransactionLine = (savededTransactionLine: SolsofSpa.Helper.structTransactionLine) => {
        if (this.bEditTransactionLine) {
            this.transaction.transactionLineArray[this.selectedTransactionLineIndex] = savededTransactionLine;
        } else {
            this.transaction.transactionLineArray.push(savededTransactionLine);
        };
        this.gridOptions.api.setRowData(this.transaction.transactionLineArray);
        this.selectedTransactionLineIndex = -1;
        this.calculateTransactionTotal();
    }

    newTransactionLine = () => {
        this.bEditTransactionLine = false;
        this.transactionLineComponent.newTransactionLine(this.ledgerAccounts, this.transaction.transactionType);
    }

    ////////////////////////////////////
    //grid
    ////////////////////////////////////
    columnDefs: any[] = [
        { headerName: 'Ledger Account', field: 'ledgerAccountName' },
        { headerName: 'Amount', field: 'amount', cellClass: 'rightJustify', cellRenderer: (params: any) => { return HelperService.formatMoney(Number(params.value)); } },
        { headerName: 'Debit', field: 'debit' },
        { headerName: 'Comment', field: 'comment' }
    ];
    onRowClicked = (params: any) => {
        //params.node.id seems to be index of data array (not row number!)
        this.selectedTransactionLineIndex = params.node.id;
    }
    onRowDoubleClicked = (params: any) => {
        var selectedTransactionLine = <SolsofSpa.Helper.structTransactionLine>params.data;
        this.bEditTransactionLine = true;
        this.transactionLineComponent.displayTransactionline(selectedTransactionLine, this.ledgerAccounts, this.transaction.transactionType);
    }
    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}



