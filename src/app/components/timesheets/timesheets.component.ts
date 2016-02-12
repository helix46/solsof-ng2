import {Router} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from 'angular2/http';
import {Component, ViewChild} from 'angular2/core';
import {TimesheetsService} from '../../services/Timesheets/Timesheets.service';
import {TimesheetComponent} from '../timesheet/timesheet.component';
import {DebtorsService} from '../../services/debtors/debtors.service';



@Component({
    //selector: 'ledger-accounts',
    templateUrl: 'src/app/components/Timesheets/Timesheets.component.html',
    pipes: [],
    providers: [TimesheetsService, DebtorsService],
    directives: [(<any>window).ag.grid.AgGridNg2, TimesheetComponent]
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
        this.timesheetVisible = false;
        this.loadTimesheets();
        this.loadDebtors();
        //need this
    }
    //////////////////////////////////////////////////////////
    //properties
    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    //selectedTimesheet: SolsofSpa.Api.DataContext.tblTimesheet;
    public Timesheets: SolsofSpa.Api.DataContext.tblTimesheet[] = [];
    public excludeInactive: boolean = true;
    getTimesheetsSuccess: boolean = true;
    getDebtorsSuccess: boolean = true;
    editTimesheet: boolean;
    timesheetVisible: boolean;
    @ViewChild(TimesheetComponent) timesheetComponent: TimesheetComponent;
    //////////////////////////////////////////////////////////

    //events
    addTimesheet = () => {
        //this.router.navigate(['Timesheet', { edit: "false" }]);
        this.editTimesheet = false;
        this.timesheetVisible = true;
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

    onGetTimesheetsSuccess = (timesheets: SolsofSpa.Api.DataContext.tblTimesheet[]) => {
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
    columnDefs: ag.grid.ColDef[] = [
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
                return HelperService.noNullNumber(params.value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
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

    //onGetTimesheet = (timesheet: SolsofSpa.Helper.structTimesheet) => {
    //    this.structTimesheet = timesheet;
    //    this.getTimesheetSuccess = true;
    //    this.timesheetComponent.calculateTimesheetTotal();
    //}

    onRowDoubleClicked = (params: any) => {
        //this.onRowClicked(params);
        var selectedTimesheet = <SolsofSpa.Api.DataContext.tblTimesheet>params.data;
        //var EntityId = GetEntityService.getInstance().getEntityId();
        //this.timesheetService.getTimesheet(selectedTimesheet.timesheetID, EntityId).subscribe(this.onGetTimesheet, this.logTimesheetError);
        this.timesheetComponent.getTimesheet(selectedTimesheet.timesheetID);
        this.editTimesheet = true;
        this.timesheetVisible = true;
        //this.router.navigate(['Timesheet', { timesheetID: this.selectedTimesheet.timesheetID, edit: true }]);
    }

    gridOptions: ag.grid.GridOptions = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}