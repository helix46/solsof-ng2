import {Component, Output, EventEmitter, Input} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'transaction-line',
    templateUrl: 'src/app/components/transactionLine/transactionLine.component.html',
    styles: ['.modalSolsofVisible {display: block;}']
})


export class TransactionLineComponent {
    constructor() {
        console.log('constructor TransactionLineComponent');
    }

    @Output() saver: EventEmitter<SolsofSpa.Helper.structTransactionLine> = new EventEmitter();
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    transactionLineVisible: boolean;
    sLedgerAccountID: string;
    amount: number;
    comment: string;
    debit: boolean;
    Comment: string;
    titleTransactionLine: string;

    ngOnInit() {
    }

    displayTransactionline = (selectedTransactionLine: SolsofSpa.Helper.structTransactionLine, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) => {
        this.titleTransactionLine = 'Edit Transaction Line';
        this.amount = selectedTransactionLine.amount;
        this.comment = selectedTransactionLine.comment;
        this.debit = selectedTransactionLine.debit;
        this.sLedgerAccountID = selectedTransactionLine.ledgerAccountID.toString();
        this.transactionLineVisible = true;
        this.ledgerAccounts = ledgerAccounts;
    }

    newTransactionLine = (ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) => {
        this.titleTransactionLine = 'Add Transaction Line';
        this.amount = 0;
        this.comment = '';
        this.debit = true;
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
