import {Router} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {InvoicesService} from '../../services/Invoices/Invoices.service';
//import 'rxjs/Rx'; //for map



@Component({
    selector: 'ledger-accounts',
    templateUrl: 'src/app/components/Invoices/Invoices.component.html',
    pipes: [],
    providers: [InvoicesService],
    directives: [(<any>window).ag.grid.AgGridNg2]
})

export class InvoicesComponent {

    public Invoices: SolsofSpa.Api.DataContext.spGetInvoices_Result[] = [];
    public excludeInactive: boolean = true;
    getInvoicesSuccess: boolean = true;

    constructor(private InvoicesService: InvoicesService, public router: Router) {
        console.log('constructor InvoicesComponent');
        window.onresize = () => {
            this.gridOptions.api.sizeColumnsToFit();
            //HelperService.autoSizeAll(this.columnDefs, this.gridOptions);
        };
    }
    ngOnInit() {
        this.loadInvoices();
    }
    selectedInvoice: SolsofSpa.Api.DataContext.spGetInvoices_Result;

    chkExcludeInactiveClicked(chkExcludeInactive: HTMLInputElement) {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadInvoices();
    }

    //////////////////////////////////////////////////////////////
    //get data
    logError = (e: any) => {
        console.log('getInvoices Error');
        this.getInvoicesSuccess = false;
    }

    complete = () =>{
        console.log('getInvoices complete');
    }

    onGetInvoicesSuccess = (data: SolsofSpa.Api.DataContext.spGetInvoices_Result[]) => {
        this.Invoices = data;
        this.gridOptions.api.setRowData(data);
        //HelperService.autoSizeAll(this.columnDefs, this.gridOptions);
        this.gridOptions.api.sizeColumnsToFit();
        this.getInvoicesSuccess = true;
    }

    loadInvoices = () => {
        //var InvoicesComponentThis = this;

        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.InvoicesService.getInvoices(EntityId).subscribe(this.onGetInvoicesSuccess, this.logError, this.complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
    };
     
    /////////////////////////////////////////////////////////////
    //grid
    columnDefs: ag.grid.ColDef[] = [
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

    onRowClicked = (params: any) =>{
        this.selectedInvoice = <SolsofSpa.Api.DataContext.spGetInvoices_Result>params.data;
        console.log('Invoice onRowClicked');
    }

    onRowDoubleClicked = (params: any) => {
        this.onRowClicked(params);
        this.router.navigate(['Transactions', { transactionID: this.selectedInvoice.transactionID }]);
    }

    gridOptions: ag.grid.GridOptions = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}