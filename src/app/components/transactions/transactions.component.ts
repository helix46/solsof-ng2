import {Router, RouteParams} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {TransactionsService} from '../../services/Transactions/Transactions.service';
//import 'rxjs/Rx'; //for map



@Component({
    selector: 'transaction',
    templateUrl: 'src/app/components/transactions/transactions.component.html',
    pipes: [],
    providers: [TransactionsService],
    directives: [(<any>window).ag.grid.AgGridNg2]
})

export class TransactionsComponent {

    public Transactions: SolsofSpa.Api.DataContext.tblTransaction[] = [];

    constructor(private TransactionsService: TransactionsService, private router: Router, private routeParams: RouteParams) {
        console.log('constructor TransactionsComponent');
        this.listDateDescending = true;
        window.onresize = () => {
            this.gridOptions.api.sizeColumnsToFit();
            //HelperService.getInstance().autoSizeAll(this.columnDefs, this.gridOptions);
        };
    }
    ledgerAccountID: number;
    ngOnInit() {
        this.ledgerAccountID = Number(this.routeParams.get('ledgerAccountID'));
        this.loadTransactions();
    }

    selectedTransaction: SolsofSpa.Api.DataContext.tblTransaction;
    listDateDescending: boolean;
    chkListDateDescendingClicked(chkListDateDescending: HTMLInputElement) {
        this.listDateDescending = chkListDateDescending.checked;
        this.loadTransactions();
    }

    //////////////////////////////////////////////////////////////
    //get data
    logError(e: any) {
        console.log('getTransactions Error');
    }

    complete() {
        console.log('getTransactions complete');
    }

    onGetTransactionsSuccess = (data: SolsofSpa.Api.DataContext.tblTransaction[]) => {
        this.Transactions = data;
        this.gridOptions.api.setRowData(data);
        //HelperService.getInstance().autoSizeAll(this.columnDefs, this.gridOptions);
        this.gridOptions.api.sizeColumnsToFit();
    }

    loadTransactions() {
        //var TransactionsComponentThis = this;

        if (HelperService.getInstance().tokenIsValid()) {
            var entityID = HelperService.getInstance().getEntityId();
            if (entityID === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.TransactionsService.getTransactions(entityID, this.ledgerAccountID, this.listDateDescending).subscribe(this.onGetTransactionsSuccess, this.logError, this.complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
    };
     
    /////////////////////////////////////////////////////////////
    //grid
    columnDefs: ag.grid.ColDef[] = [
        { headerName: "transactionID", field: "transactionID", hide: true },
        { headerName: "Date", field: "transactionDate" },
        { headerName: "Comment", field: "comment" },
        { headerName: "Type", field: "transactionType" },
        {
            headerName: "Amount",
            field: "amount",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.getInstance().noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
            },
            minWidth: 80
        },
        {
            headerName: "Total",
            field: "total",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.getInstance().noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
            },
            minWidth: 80
        }
    ];

    onRowClicked(params: any) {
        this.selectedTransaction = <SolsofSpa.Api.DataContext.tblTransaction>params.data;
        console.log('Transaction onRowClicked');
    }

    onRowDoubleClicked(params: any) {
        this.onRowClicked(params);
        alert('this.router.navigate([]);')
    }

    gridOptions: ag.grid.GridOptions = HelperService.getInstance().getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}