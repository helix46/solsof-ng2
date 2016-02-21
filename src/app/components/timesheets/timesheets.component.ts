﻿import {Router} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from 'angular2/http';
import {Component, ViewChild} from 'angular2/core';
import {TimesheetsService} from '../../services/Timesheets/Timesheets.service';
import {TimesheetComponent} from '../timesheet/timesheet.component';
import {DebtorsService} from '../../services/debtors/debtors.service';
import {TimesheetService} from '../../services/timesheet/timesheet.service';
import {DialogBoxComponent} from '../utilities/dialogBox/dialogBox.component';
//import {AgGridNg2} from 'ag-grid-ng2/main';
//import {GridOptions} from 'ag-grid/main';

@Component({
    templateUrl: 'src/app/components/Timesheets/Timesheets.component.html',
    pipes: [],
    providers: [TimesheetsService, DebtorsService, TimesheetService],
    directives: [(<any>window).ag.grid.AgGridNg2, TimesheetComponent, DialogBoxComponent]
    //directives: [AgGridNg2, TimesheetComponent]
})

export class TimesheetsComponent {
    constructor(private timesheetsService: TimesheetsService, public router: Router, private debtorsService: DebtorsService, private timesheetService: TimesheetService) {
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
    @ViewChild(DialogBoxComponent) dialogBoxComponent: DialogBoxComponent;
    selectedTimesheetID: number;
    //selectedTimesheetIndex: number;

    //////////////////////////////////////////////////////////

    //events
    addTimesheet = () => {
        //this.router.navigate(['Timesheet', { edit: "false" }]);
        this.timesheetComponent.newTimesheet(this.debtors);
        this.editTimesheet = false;
    }

    chkExcludeInactiveClicked = (chkExcludeInactive: HTMLInputElement) => {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadTimesheets();
    }

    //loadDebtors
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
            console.log('getDebtors Error');
            loadDebtorsThis.getDebtorsSuccess = false;
        }
        function onGetDebtorsSuccess(debtors: SolsofSpa.Api.DataContext.tblDebtor[]) {
            loadDebtorsThis.debtors = debtors;
        }
        function complete() {
            console.log('loadDebtors complete');
        }
    };

    loadTimesheets = () => {
        var loadTimesheetsThis = this;
        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.timesheetsService.getTimesheets(EntityId).subscribe(onGetTimesheetsSuccess, logTimesheetsError, complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
        function onGetTimesheetsSuccess(timesheets: SolsofSpa.Api.DataContext.spListTimesheets_Result[]) {
            loadTimesheetsThis.Timesheets = timesheets;
            loadTimesheetsThis.gridOptions.api.setRowData(timesheets);
            loadTimesheetsThis.gridOptions.api.sizeColumnsToFit();
            loadTimesheetsThis.getTimesheetsSuccess = true;
        }
        function logTimesheetsError() {
            console.log('getTimesheets Error');
            loadTimesheetsThis.getTimesheetsSuccess = false;
        }
        function complete() {
            console.log('loadTimesheets complete');
        }
    };

    deleteTimesheet = () => {
        var deleteTimesheetThis = this;
        this.dialogBoxComponent.displayDialogBox('Are you sure you want to delete this time sheet?', deleteTimesheetConfirmed);
        function deleteTimesheetConfirmed() {
            if (HelperService.tokenIsValid()) {
                var obs = deleteTimesheetThis.timesheetService.deleteTimesheet(deleteTimesheetThis.selectedTimesheetID);
                obs.subscribe(onDeleteTimesheetSuccess, err=> logTimesheetsError(err), complete)

            } else {
                deleteTimesheetThis.router.navigate(['Login']);
            }
            function onDeleteTimesheetSuccess() {
                deleteTimesheetThis.loadTimesheets()
            }
            function logTimesheetsError(err: any) {
                console.log('deleteTimesheet Error');
            }
            function complete() {
                console.log('loadTimesheets complete');
            }
        }
    }

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
            headerName: "Hours",
            field: "minutes",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                var totalMinutes: number = params.value;
                return HelperService.convertMinutesToTimeString(totalMinutes);
            },
            minWidth: 80
        },
        { headerName: "Comment", field: "comment", minWidth: 100 },
        { headerName: "#", field: "invoiceNumber", minWidth: 100 }
    ];

    onRowClicked = (params: any) => {
        var selectedTimesheet = <SolsofSpa.Api.DataContext.spListTimesheets_Result>params.data;
        this.selectedTimesheetID = selectedTimesheet.timesheetID;
    }

    onRowDoubleClicked = (params: any) => {
        this.onRowClicked(params);
        var selectedTimesheet = <SolsofSpa.Api.DataContext.spListTimesheets_Result>params.data;
        this.timesheetComponent.getTimesheet(selectedTimesheet.timesheetID, this.debtors);
        this.editTimesheet = true;
    }

    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}