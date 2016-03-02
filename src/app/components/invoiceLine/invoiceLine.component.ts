import {Component, Output, EventEmitter, Input} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'invoice-line',
    templateUrl: 'src/app/components/invoiceLine/invoiceLine.component.html',
    styles: ['.modalSolsofVisible {display: block;}']
})

export class InvoiceLineComponent {
    constructor() {
        console.log('constructor InvoiceLineComponent');
    }

    @Output() returnInvoiceLine: EventEmitter<SolsofSpa.Helper.structTransactionLine> = new EventEmitter();
    invoiceLineVisible: boolean;
    sLledgerAccountID: string;
    amount: number;
    comment: string;
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]

    titleInvoiceLine: string;

    ngOnInit() {
        this.clearInvoiceLine();
    }

    displayInvoiceline = (selectedInvoiceLine: SolsofSpa.Helper.structTransactionLine, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) => {
        this.ledgerAccounts = ledgerAccounts;
        this.titleInvoiceLine = 'Edit Invoice Line';
        this.sLledgerAccountID = selectedInvoiceLine.ledgerAccountID.toString();
        this.amount = selectedInvoiceLine.amount;
        this.comment = selectedInvoiceLine.comment;
        this.invoiceLineVisible = true;
    }

    newInvoiceLine = (ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) => {
        this.ledgerAccounts = ledgerAccounts;
        this.clearInvoiceLine();
        this.invoiceLineVisible = true;
    }

    clearInvoiceLine = () => {
        this.titleInvoiceLine = 'Add Invoice Line';
        this.sLledgerAccountID = '';
        this.amount = 0;
        this.comment = '';
    }

    cancelInvoiceLine = () => {
        this.clearInvoiceLine();
        this.invoiceLineVisible = false;
    }

    saveInvoiceLine() {
        var selectedInvoiceLine: SolsofSpa.Helper.structTransactionLine = {
            ledgerAccountID: Number(this.sLledgerAccountID),
            ledgerAccountName: '',
            debitOrCredit: '',
            amount: this.amount,
            debit: false,
            comment: this.comment,
            hidden: false,
            timesheetID: -1,
            invoiceID: -1
        }
        this.returnInvoiceLine.emit(selectedInvoiceLine);
        this.invoiceLineVisible = false;
    }
}



























