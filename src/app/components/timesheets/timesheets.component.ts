import {Router} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from 'angular2/http';
import {Component, ViewChild} from 'angular2/core';
import {TimesheetsService} from '../../services/Timesheets/Timesheets.service';
import {TimesheetComponent} from '../timesheet/timesheet.component';
import {DebtorsService} from '../../services/debtors/debtors.service';
//import {AgGridNg2} from 'ag-grid-ng2/main';
//import {GridOptions} from 'ag-grid/main';

@Component({
    //selector: 'ledger-accounts',
    templateUrl: 'src/app/components/Timesheets/Timesheets.component.html',
    pipes: [],
    providers: [TimesheetsService, DebtorsService],
    directives: [(<any>window).ag.grid.AgGridNg2, TimesheetComponent]
    //directives: [AgGridNg2, TimesheetComponent]
})

export class TimesheetsComponent {


    constructor(private timesheetsService: TimesheetsService, public router: Router, private debtorsService: DebtorsService) {
        console.log('constructor TimesheetsComponent');
        this.getTimesheetsSuccess = true;
        //window.onresize = () => {
        //    this.gridOptions.api.sizeColumnsToFit();
        //};
    }
    ngOnInit() {
        this.loadTimesheets();
        this.loadDebtors();
        //need this
    }
    //////////////////////////////////////////////////////////
    //properties
    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    public Timesheets: SolsofSpa.Api.DataContext.spListTimesheets_Result[] = [];
    public excludeInactive: boolean = true;
    getTimesheetsSuccess: boolean = true;
    getDebtorsSuccess: boolean = true;
    editTimesheet: boolean;
    @ViewChild(TimesheetComponent) timesheetComponent: TimesheetComponent;

    //////////////////////////////////////////////////////////

    //events
    addTimesheet = () => {
        //this.router.navigate(['Timesheet', { edit: "false" }]);
        this.editTimesheet = false;
    }

    chkExcludeInactiveClicked = (chkExcludeInactive: HTMLInputElement) => {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadTimesheets();
    }

    /////////////////////////////////////////////////////////
    //get data
    logTimesheetsError = () => {
        console.log('getTimesheets Error');
        this.getTimesheetsSuccess = false;
    }

    logDebtorsError = () => {
        console.log('getDebtors Error');
        this.getDebtorsSuccess = false;
    }

    complete = () => {
        console.log('getTimesheets complete');
    }

    onGetDebtorsSuccess = (debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        this.debtors = debtors;
    }

    onGetTimesheetsSuccess = (timesheets: SolsofSpa.Api.DataContext.spListTimesheets_Result[]) => {
        this.Timesheets = timesheets;
        this.gridOptions.api.setRowData(timesheets);
        this.gridOptions.api.sizeColumnsToFit();
        this.getTimesheetsSuccess = true;
    }

    //loadDebtors
    loadDebtors = () => {

        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.debtorsService.getDebtors(EntityId).subscribe(this.onGetDebtorsSuccess, this.logDebtorsError, this.complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
    };
    loadTimesheets = () => {

        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.timesheetsService.getTimesheets(EntityId).subscribe(this.onGetTimesheetsSuccess, this.logTimesheetsError, this.complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
    };
 
    ////////////////////////////////////////////////
    //grid
    columnDefs: any[] = [
        { headerName: "Id", field: "timesheetID", hide: true },
        {
            headerName: "Week Ending",
            field: "weekEnding",
            cellRenderer: function (params: any) {
                return HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
            },
            cellClass: 'rightJustify',
        },
        { headerName: "Name", field: "debtorName", minWidth: 100 },
        {
            headerName: "Minutes",
            field: "minutes",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.formatMoney(params.value);
            },
            minWidth: 80
        },
        { headerName: "Comment", field: "comment", minWidth: 100 },
        { headerName: "#", field: "invoiceNumber", minWidth: 100 }
    ];

    onRowClicked = (params: any) => {
        //this.selectedTimesheet = <SolsofSpa.Api.DataContext.tblTimesheet>params.data;
        console.log('Timesheet onRowClicked');
    }

    onRowDoubleClicked = (params: any) => {
        var selectedTimesheet = <SolsofSpa.Api.DataContext.spListTimesheets_Result>params.data;
        this.timesheetComponent.getTimesheet(selectedTimesheet.timesheetID, this.debtors);
        this.editTimesheet = true;
    }

    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}