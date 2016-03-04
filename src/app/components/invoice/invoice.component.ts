import {Response} from 'angular2/http';
import {Component, Input, Output, EventEmitter, ViewChild} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';
import {InvoiceService} from '../../services/invoice/invoice.service';
import { Router, RouterLink} from 'angular2/router';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {InvoiceLineComponent} from '../invoiceline/invoiceline.component';
//import {AgGridNg2} from 'ag-grid-ng2/main';
//import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'invoiceModal',
    templateUrl: 'src/app/components/invoice/invoice.component.html',
    styles: ['.modalSolsofVisible {display: block;}'],
    providers: [InvoiceService],
    directives: [(<any>window).ag.grid.AgGridNg2, InvoiceLineComponent]
    //directives: [AgGridNg2, InvoiceLineComponent]
})

//interface structTransaction {
//    transactionID: number;
//    entityID: number;
//    bankAccountID: number;
//    debtorID: number;
//    transactionType: SolsofSpa.Helper.enumTransactionType;
//    chequeNumber: number;
//    comment: string;
//    sTransactionDate: string;
//    transactionLineArray: SolsofSpa.Helper.structTransactionLine[];
//}

export class InvoiceComponent {
    constructor(private invoiceService: InvoiceService, private router: Router) {
        console.log('constructor invoiceComponent');
    }

    editInvoice: boolean;
    titleInvoice: string;
    invoiceTotal: string;
    getInvoiceSuccess: boolean = true;
    @Output() ok: EventEmitter<string> = new EventEmitter();
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    invoice: SolsofSpa.Helper.structTransaction = {
        comment: '',
        debtorID: -1,
        entityID: -1,
        transactionID: -1,
        transactionLineArray: [],
        bankAccountID: -1,
        transactionType: SolsofSpa.Helper.enumTransactionType.Invoice,
        chequeNumber: -1,
        sTransactionDate: ''
    };
    invoiceVisible: boolean = false;

    ngOnInit() {

        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
    }

    calculateInvoiceTotal = () => {
        var totalAmount = 0, i: number;
        for (i = 0; i < this.invoice.transactionLineArray.length; i = i + 1) {
            totalAmount = totalAmount + this.invoice.transactionLineArray[i].amount;
        }
        this.invoiceTotal = HelperService.formatMoney(totalAmount);
    };

    newInvoice = (debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        var newInvoiceThis = this;
        if (HelperService.tokenIsValid()) {
            this.debtors = debtors;
            this.titleInvoice = 'Add Invoice';
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.invoice = {
                    transactionID: -1,
                    entityID: EntityId,
                    bankAccountID: -1,
                    debtorID: -1,
                    transactionType: SolsofSpa.Helper.enumTransactionType.Invoice,
                    chequeNumber: -1,
                    comment: '',
                    sTransactionDate: HelperService.formatDateForJSon(new Date()),
                    transactionLineArray: []
                }
                this.gridOptions.api.setRowData(this.invoice.transactionLineArray);
            }
            this.editInvoice = false;
            this.getInvoiceSuccess = true;
            this.calculateInvoiceTotal();
            this.invoiceVisible = true;
        } else {
            this.router.navigate(['Login']);
        }
    }

    newInvoiceFromTimesheet = (timesheetID: number, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        var getInvoiceThis = this;
        if (HelperService.tokenIsValid()) {
            getInvoiceThis.ledgerAccounts = ledgerAccounts;
            getInvoiceThis.debtors = debtors
            var EntityId = GetEntityService.getInstance().getEntityId();
            getInvoiceThis.titleInvoice = 'Invoice created from Timesheet';
            getInvoiceThis.invoiceService.getInvoiceFromTimesheet(timesheetID, EntityId).subscribe(onGetInvoiceFromTimesheet, logInvoiceFromTimesheetError);
        } else {
            getInvoiceThis.router.navigate(['Login']);
        }
        function onGetInvoiceFromTimesheet(timesheetInvoiceLine: SolsofSpa.Helper.structTimesheetInvoiceLine) {
            //add invoice line from timesheet

            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                getInvoiceThis.invoice.debtorID = timesheetInvoiceLine.debtorID;
                getInvoiceThis.invoice.transactionType = timesheetInvoiceLine.transactionType;
                getInvoiceThis.invoice.sTransactionDate = HelperService.formatDateForJSon(new Date());
                getInvoiceThis.invoice.entityID = EntityId;
                //get debtor for invoice
                var tempInvoiceLine: SolsofSpa.Helper.structTransactionLine;
                tempInvoiceLine = {
                    ledgerAccountID: timesheetInvoiceLine.incomeLedgerAccountID,
                    ledgerAccountName: timesheetInvoiceLine.incomeLedgerAccountName,
                    amount: timesheetInvoiceLine.amount,
                    comment: timesheetInvoiceLine.comment,
                    timesheetID: timesheetInvoiceLine.timesheetID,
                    hidden: false,
                    debit: false,
                    debitOrCredit: '',
                    invoiceID: -1
                };
                getInvoiceThis.invoice.transactionLineArray.push(tempInvoiceLine);
                tempInvoiceLine = {
                    ledgerAccountID: timesheetInvoiceLine.gstIncomeLedgerAccountID,
                    ledgerAccountName: timesheetInvoiceLine.gstIncomeLedgerAccountName,
                    amount: timesheetInvoiceLine.amount / 10,
                    comment: 'GST',
                    timesheetID: -1,
                    hidden: false,
                    debit: false,
                    debitOrCredit: '',
                    invoiceID: -1
                };
                getInvoiceThis.invoice.transactionLineArray.push(tempInvoiceLine);
                getInvoiceThis.calculateInvoiceTotal();

                getInvoiceThis.editInvoice = false;
                getInvoiceThis.gridOptions.api.setRowData(getInvoiceThis.invoice.transactionLineArray);
                getInvoiceThis.gridOptions.api.sizeColumnsToFit();
                getInvoiceThis.getInvoiceSuccess = true;
                getInvoiceThis.calculateInvoiceTotal();
                getInvoiceThis.invoiceVisible = true;
            }
        }
        function logInvoiceFromTimesheetError() {
            console.log('getInvoiceFromTimesheetError');
            getInvoiceThis.getInvoiceSuccess = false;
        }
    }

    getInvoice = (invoiceID: number, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[], debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        var getInvoiceThis = this;
        if (HelperService.tokenIsValid()) {
            getInvoiceThis.ledgerAccounts = ledgerAccounts;
            getInvoiceThis.debtors = debtors
            var EntityId = GetEntityService.getInstance().getEntityId();
            getInvoiceThis.titleInvoice = 'Edit Invoice';
            getInvoiceThis.invoiceService.getInvoice(invoiceID, EntityId).subscribe(onGetInvoice, logInvoiceError);
        } else {
            getInvoiceThis.router.navigate(['Login']);
        }
        function onGetInvoice(invoice: SolsofSpa.Helper.structTransaction) {
            getInvoiceThis.editInvoice = true;
            getInvoiceThis.invoice = invoice;
            getInvoiceThis.gridOptions.api.setRowData(invoice.transactionLineArray);
            getInvoiceThis.gridOptions.api.sizeColumnsToFit();
            getInvoiceThis.getInvoiceSuccess = true;
            getInvoiceThis.calculateInvoiceTotal();
            getInvoiceThis.invoiceVisible = true;
        }
        function logInvoiceError() {
            console.log('getInvoice Error');
            getInvoiceThis.getInvoiceSuccess = false;
        }
    }

    //dropdowns are not currently updating model
    onChangeDebtor = (value: any) => {
        var currentTarget: HTMLSelectElement = <HTMLSelectElement>event.currentTarget;
        this.invoice.debtorID = Number(currentTarget.value);
    }

    cancelInvoice = () => {
        this.invoiceVisible = false;
    }

    okClicked = () => {
        var okClickedThis = this;
        if (this.editInvoice) {
            if (HelperService.tokenIsValid()) {
                this.invoiceService.updateInvoice(this.invoice).subscribe(updateInvoiceSuccess, logError, complete);
                this.invoiceVisible = false;
            } else {
                this.router.navigate(['Login']);
            }
        } else {
            if (HelperService.tokenIsValid()) {
                this.invoiceService.saveNewInvoice(this.invoice).subscribe(updateInvoiceSuccess, logError, complete);
                this.invoiceVisible = false;
            } else {
                this.router.navigate(['Login']);
            }
        }

        function logError(obj: any) {
            console.log(JSON.stringify(obj));
            alert(JSON.stringify(obj));
        }
        function complete() {
            console.log('invoice complete');
        }
        function updateInvoiceSuccess() {
            okClickedThis.ok.emit('');
        }
    }


    ////////////////////////////////////
    //InvoiceLine
    ////////////////////////////////////
    selectedInvoiceLineIndex: number;
    @ViewChild(InvoiceLineComponent) invoiceLineComponent: InvoiceLineComponent;
    bEditInvoiceLine: boolean;

    deleteInvoiceLine = () => {
        this.invoice.transactionLineArray.splice(this.selectedInvoiceLineIndex, 1);
        this.gridOptions.api.setRowData(this.invoice.transactionLineArray);
    }

    saveInvoiceLine = (savededInvoiceLine: SolsofSpa.Helper.structTransactionLine) => {
        savededInvoiceLine.ledgerAccountName = HelperService.getLedgerAccountName(savededInvoiceLine.ledgerAccountID, this.ledgerAccounts);
        if (this.bEditInvoiceLine) {
            this.invoice.transactionLineArray[this.selectedInvoiceLineIndex] = savededInvoiceLine;
        } else {
            this.invoice.transactionLineArray.push(savededInvoiceLine);
        };
        this.gridOptions.api.setRowData(this.invoice.transactionLineArray);
        this.calculateInvoiceTotal();
    }


    newInvoiceLine = () => {
        //var newInvoiceLineThis = this;
        this.bEditInvoiceLine = false;
        this.invoiceLineComponent.newInvoiceLine(this.ledgerAccounts);
    }

    ////////////////////////////////////
    //grid
    ////////////////////////////////////
    columnDefs: any[] = [
        { headerName: 'Ledger Account', field: 'ledgerAccountName' },
        { headerName: 'Amount', field: 'amount', cellClass: 'rightJustify', cellRenderer: (params: any) => { return HelperService.formatMoney(params.value); } },
        { headerName: 'Comment', field: 'comment' }
    ];
    onRowClicked = (params: any) => {
        //params.node.id seems to be index of data array (not row number!)
        this.selectedInvoiceLineIndex = params.node.id;
    }
    onRowDoubleClicked = (params: any) => {
        var selectedInvoiceLine = <SolsofSpa.Helper.structTransactionLine>params.data;
        this.bEditInvoiceLine = true;
        this.invoiceLineComponent.displayInvoiceline(selectedInvoiceLine, this.ledgerAccounts);
    }
    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}



