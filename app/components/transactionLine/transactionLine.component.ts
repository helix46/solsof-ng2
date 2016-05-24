import {Component, Output, EventEmitter, Input} from '@angular/core';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'transaction-line',
    templateUrl: 'app/components/transactionLine/transactionLine.component.html',
    styles: ['.modalSolsofVisible {display: block;}']
})


export class TransactionLineComponent {
    constructor() {
        HelperService.log('constructor TransactionLineComponent');
    }

    @Output() saver: EventEmitter<SolsofSpa.Helper.structTransactionLine> = new EventEmitter<SolsofSpa.Helper.structTransactionLine>();
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    transactionLineVisible: boolean;
    sLedgerAccountID: string;
    amount: number;
    comment: string;
    debit: boolean;
    Comment: string;
    titleTransactionLine: string;
    transactionType: SolsofSpa.Helper.enumTransactionType;
    debitCreditDisabled: boolean;

    ngOnInit() {
    }

    displayTransactionline = (selectedTransactionLine: SolsofSpa.Helper.structTransactionLine, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], transactionType: SolsofSpa.Helper.enumTransactionType) => {
        this.transactionType = transactionType;
        this.configureTransactionType(transactionType);
        this.titleTransactionLine = 'Edit Transaction Line';
        this.amount = selectedTransactionLine.amount;
        this.comment = selectedTransactionLine.comment;
        this.debit = selectedTransactionLine.debit;
        this.sLedgerAccountID = selectedTransactionLine.ledgerAccountID.toString();
        this.transactionLineVisible = true;
        this.ledgerAccounts = ledgerAccounts;
    }

    configureTransactionType = (transactionType: SolsofSpa.Helper.enumTransactionType) => {
        switch (transactionType) {
            case SolsofSpa.Helper.enumTransactionType.Cheque:
                this.debit = true;
                this.debitCreditDisabled = true;
                break;
            case SolsofSpa.Helper.enumTransactionType.Deposit:
                this.debit = false;
                this.debitCreditDisabled = true;
                break;
            case SolsofSpa.Helper.enumTransactionType.GeneralJournal:
                this.debit = true;
                this.debitCreditDisabled = false;
                break;
        }
    }

    newTransactionLine = (ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], transactionType: SolsofSpa.Helper.enumTransactionType) => {
        this.transactionType = transactionType;
        this.configureTransactionType(transactionType);
        this.titleTransactionLine = 'Add Transaction Line';
        this.amount = 0;
        this.comment = '';
        this.sLedgerAccountID = '';
        this.transactionLineVisible = true;
        this.ledgerAccounts = ledgerAccounts;
    }

    modalOnKeyup() {
    }

    cancelTransactionLine = () => {
        this.transactionLineVisible = false;
    }

    saveTransactionLine = () => {
        var saveTransactionLineThis = this;
        var ledgerAccountID = Number(saveTransactionLineThis.sLedgerAccountID);
        var transactionLine: SolsofSpa.Helper.structTransactionLine = {
            amount: saveTransactionLineThis.amount,
            comment: saveTransactionLineThis.comment,
            debit: saveTransactionLineThis.debit,
            debitOrCredit: '',
            hidden: false,
            invoiceID: -1,
            ledgerAccountID: ledgerAccountID,
            ledgerAccountName: HelperService.getLedgerAccountName(ledgerAccountID, saveTransactionLineThis.ledgerAccounts),
            timesheetID: -1
        }
        this.saver.emit(transactionLine);
        this.transactionLineVisible = false;
    }
}
