/// <reference path="../../solsof.d.ts" />
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';
import {TimesheetService} from '../../services/timesheet/timesheet.service';
import {DebtorsService} from '../../services/debtors/debtors.service';
import { Router, RouterLink, RouteParams} from 'angular2/router';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';

@Component({
    selector: 'timesheet',
    templateUrl: 'src/app/components/timesheet/timesheet.component.html',
    providers: [TimesheetService, DebtorsService]
})


export class TimesheetComponent {
    constructor(private timesheetService: TimesheetService, private router: Router, private debtorsService: DebtorsService, private routeParams: RouteParams) {
        console.log('constructor timesheetComponent');
        this.currentDebtorID = -1;
        this.timesheeet = {
            comment: '',
            debtorID: -1,
            entityID: GetEntityService.getInstance().getEntityId(),
            sWeekEnding: '',
            timesheetID: -1,
            timesheetLineArray: []
        };
    }

    timesheetID: number;
    timesheeet: SolsofSpa.Helper.structTimesheet;
    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    editTimesheet: boolean;
    title: string;
    currentDebtorID: number;
    timesheet: SolsofSpa.Helper.structTimesheet;
    weekEnding: string;
    bEditTimesheet: boolean;
    bEditTimesheetLine: boolean;

    //tempTimesheetLine: StructTimesheetLineJs;
    //selectedTimesheetLine: StructTimesheetLineJs;
    timesheetLineVisible: boolean;

    ngOnInit() {
        this.bEditTimesheet = Boolean(this.routeParams.params['edit']);
        //this.bEditTimesheet = <any>this.routeParams.params['edit'];
        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }

        var EntityId = GetEntityService.getInstance().getEntityId();
        if (EntityId === -1) {
            this.router.navigate(['Entities']);
        } else {
            this.debtorsService.getDebtors(EntityId).subscribe(this.ongetDebtors, this.logGetDebtorsError);
            if (this.bEditTimesheet) {
                this.title = 'Edit Timesheet';
                this.timesheetID = Number(this.routeParams.params['timesheetID']);
                this.timesheetService.getTimesheet(this.timesheetID, EntityId).subscribe(this.onGetTimesheet, this.logError);
            } else {
                this.title = 'New Timesheet';
                this.timesheetService.getMostRecentTimesheet(EntityId).subscribe(this.onGetMostRecentTimesheet, this.logError);
            }
        }
    }

    newTimesheetLine = () => {
        var newTimesheetLineThis = this;
        this.timesheetLineVisible = true;
    }

    modalOnKeyup = (ev: any) => {
        this.timesheetLineVisible = false;
    }

    cancelTimeSheetLine = () => {
        this.timesheetLineVisible = false;
    }

    dateChange() {
    }

    //saveTimeSheetLine = () => {

    //    if (this.bEditTimesheetLine) {
    //        this.copyTimesheetLine(this.tempTimesheetLine, this.selectedTimesheetLine);
    //    } else {
    //        this.timesheet.timesheetLineArray.push(this.tempTimesheetLine);
    //    }
    //    this.calculateTimesheetTotal();

    //    this.modalSolsofVisible = false;
    //}

    //copyTimesheetLine = function (sourceTimesheetLine: StructTimesheetLineJs, destinationTimesheetLine: StructTimesheetLineJs) {
    //    destinationTimesheetLine.timesheetLineDate = sourceTimesheetLine.timesheetLineDate;

    //    destinationTimesheetLine.startTimeMinutes = sourceTimesheetLine.startTimeMinutes;
    //    destinationTimesheetLine.finishTimeMinutes = sourceTimesheetLine.finishTimeMinutes;
    //    destinationTimesheetLine.timeoutMinutes = sourceTimesheetLine.timeoutMinutes;

    //    destinationTimesheetLine.sStartTime = sourceTimesheetLine.sStartTime;
    //    destinationTimesheetLine.sFinishTime = sourceTimesheetLine.sFinishTime;
    //    destinationTimesheetLine.sTimeout = sourceTimesheetLine.sTimeout;
    //};


    //closeModal = () => {
    //    this.modalSolsofVisible = false;
    //    window.onkeyup = null;
    //}


    logGetDebtorsError = (obj: any) => {
        //this.getTimesheetSuccess = false;
        var s = JSON.stringify(obj);
        console.log(s);
        alert(s);
    }

    onGetMostRecentTimesheet = (mostRecentTimesheet: SolsofSpa.Helper.structTimesheet) => {
        this.timesheeet.debtorID = mostRecentTimesheet.debtorID;
        this.weekEnding = HelperService.getInputFormatDateString(mostRecentTimesheet.sWeekEnding, 7);
    }

    onGetTimesheet = (timesheet: SolsofSpa.Helper.structTimesheet) => {
        this.timesheeet = timesheet;
        this.weekEnding = HelperService.getInputFormatDateString(timesheet.sWeekEnding, 0);
    }

    ongetDebtors = (debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        this.debtors = debtors;
    }

    onChange = (value: any) => {
        var currentTarget: HTMLSelectElement = <HTMLSelectElement>event.currentTarget;
        this.currentDebtorID = Number(currentTarget.value);
    }

    onSelect = (debtor: SolsofSpa.Api.DataContext.tblDebtor) => {
    }

    selectedDebtor: SolsofSpa.Api.DataContext.tblDebtor;

    logError = (obj: any) => {
        console.log(JSON.stringify(obj));
        alert(JSON.stringify(obj));
    }
    complete = () => {
        console.log('timesheet complete');
        this.router.navigate(['TimeSheets']);
    }

    logSuccess = () => {
        console.log('get success');
    }

    okClick = () => {
        var structTimesheet: SolsofSpa.Helper.structTimesheet = {
            comment: '',
            debtorID: this.selectedDebtor.debtorID,
            entityID: GetEntityService.getInstance().getEntityId(),
            timesheetID: -1,
            sWeekEnding: '',
            timesheetLineArray: []
        }
        if (HelperService.tokenIsValid()) {
            this.timesheetService.saveNewTimesheet(this.timesheet);
        } else {
            this.router.navigate(['Login']);
        }
    }
    ////////////////////////////////////
    //grid
    ////////////////////////////////////
    columnDefs: ag.grid.ColDef[] = [
        {
            headerName: "Date", field: "timesheetLineDate", cellRenderer: function (params: any) {
                return HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
            }
        },
        { headerName: "Start Time", field: "sStartTime", minWidth: 100 },
        { headerName: "Finish Time", field: "sFinishTime", minWidth: 100 },
        { headerName: "Time out", field: "sTimeout", minWidth: 100 }
    ];
    onRowClicked = () => {
    }
    onRowDoubleClicked = () => {
        this.bEditTimesheetLine = true;
        //this.showTimesheetLinePopup();
    }
    gridOptions: ag.grid.GridOptions = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);

}
