import {Router} from '@angular/router-deprecated';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from '@angular/http';
import {Component, ViewChild} from '@angular/core';
import {InvoicesService} from '../../services/Invoices/Invoices.service';
import {InvoiceComponent} from '../invoice/invoice.component';
import {LedgerAccountsService} from '../../services/ledgeraccounts/ledgeraccounts.service';
import {DebtorsService} from '../../services/debtors/debtors.service';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

//import 'rxjs/Rx'; //for map



@Component({
    selector: 'ledger-accounts',
    templateUrl: 'app/components/Invoices/Invoices.component.html',
    pipes: [],
    providers: [InvoicesService, LedgerAccountsService, DebtorsService],
    //directives: [(<any>window).ag.grid.AgGridNg2, InvoiceComponent]
    directives: [AgGridNg2, InvoiceComponent]
})

export class InvoicesComponent {

    public Invoices: SolsofSpa.Api.DataContext.spGetInvoices_Result[] = [];
    public excludeInactive: boolean = true;
    getInvoicesSuccess: boolean = true;
    getDebtorsSuccess: boolean = true;
    getLedgerAccountsSuccess: boolean = true;
    @ViewChild(InvoiceComponent) invoiceComponent: InvoiceComponent;
    ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    editInvoice: boolean = false;

    constructor(private InvoicesService: InvoicesService, public router: Router, private ledgerAccountsService: LedgerAccountsService, private debtorsService: DebtorsService) {
        HelperService.logError('constructor InvoicesComponent');
        window.onresize = () => {
            //this.gridOptions.api.sizeColumnsToFit();
        };
    }
    ngOnInit() {
        this.loadInvoices();
        this.loadLedgerAccounts();
        this.loadDebtors();
    }
    selectedInvoice: SolsofSpa.Api.DataContext.spGetInvoices_Result;

    chkExcludeInactiveClicked(chkExcludeInactive: HTMLInputElement) {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadInvoices();
    }

    loadDebtors = () => {
        var loadDebtorsThis = this;
        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.debtorsService.getDebtors(EntityId).subscribe(onGetDebtorsSuccess, logDebtorsError, complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
        function logDebtorsError() {
            HelperService.logError('getDebtors Error');
            loadDebtorsThis.getDebtorsSuccess = false;
        }
        function onGetDebtorsSuccess(debtors: SolsofSpa.Api.DataContext.tblDebtor[]) {
            loadDebtorsThis.debtors = debtors;
        }
        function complete() {
            HelperService.logError('loadDebtors complete');
        }
    };

    loadLedgerAccounts = () => {
        var loadLedgerAccountsThis = this;
        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.ledgerAccountsService.getLedgerAccounts(true, EntityId).subscribe(onGetLedgerAccountsSuccess, logLedgerAccountsError, complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
        function logLedgerAccountsError() {
            HelperService.logError('getLedgerAccounts Error');
            loadLedgerAccountsThis.getLedgerAccountsSuccess = false;
        }
        function onGetLedgerAccountsSuccess(ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) {
            loadLedgerAccountsThis.ledgerAccounts = ledgerAccounts;
        }
        function complete() {
            HelperService.logError('loadLedgerAccounts complete');
        }
    };

    //////////////////////////////////////////////////////////////
    //get data
    loadInvoices = () => {
        var loadInvoicesThis = this;

        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.InvoicesService.getInvoices(EntityId).subscribe(onGetInvoicesSuccess, logError, complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
        function logError(e: any) {
            HelperService.logError('getInvoices Error');
            loadInvoicesThis.getInvoicesSuccess = false;
        }

        function complete() {
            HelperService.logError('getInvoices complete');
        }

        function onGetInvoicesSuccess(data: SolsofSpa.Api.DataContext.spGetInvoices_Result[]) {
            loadInvoicesThis.Invoices = data;
            loadInvoicesThis.gridOptions.api.setRowData(data);
            loadInvoicesThis.gridOptions.api.sizeColumnsToFit();
            loadInvoicesThis.getInvoicesSuccess = true;
        }
    };
     
    /////////////////////////////////////////////////////////////
    //grid
    columnDefs: any[] = [
        //{ field: 'datePaid', type: 'date', cellFilter: 'date:"dd/MM/yyyy"' }

        { headerName: "Id", field: "transactionID", hide: true },
        { headerName: "#", field: "invoiceNumber", minWidth: 100 },
        {
            headerName: "Date",
            field: "transactionDate",
            cellRenderer: function (params: any) {
                return HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
            },
            cellClass: 'rightJustify',
        },
        { headerName: "Owed By", field: "debtorName", minWidth: 100 },
        { headerName: "Comment", field: "comment", minWidth: 100 },
        {
            headerName: "Amount",
            field: "total",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            minWidth: 80
        },
        {
            headerName: "Date Paid",
            field: "datePaid",
            cellRenderer: function (params: any): string {
                if (params.value === null) {
                    return '';
                } else {
                    return HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
                }
            },
            cellClass: 'rightJustify',
        },
    ];

    onRowClicked = (params: any) => {
        this.selectedInvoice = <SolsofSpa.Api.DataContext.spGetInvoices_Result>params.data;
        HelperService.logError('Invoice onRowClicked');
    }

    onRowDoubleClicked = (params: any) => {
        var selectedInvoice = <SolsofSpa.Api.DataContext.tblTransaction>params.data;
        this.invoiceComponent.getInvoice(selectedInvoice.transactionID, this.ledgerAccounts, this.debtors);
        this.editInvoice = true;
    }

    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}