import {Response } from '@angular/http';
import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {HelperService} from '../../services/helper/helper.service';
import {TimesheetService} from '../../services/timesheet/timesheet.service';
import { Router, RouterLink} from '@angular/router-deprecated';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {TimesheetLineComponent} from '../timesheetline/timesheetline.component';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'timesheetModal',
    templateUrl: 'app/components/timesheet/timesheet.component.html',
    styles: ['.modalSolsofVisible {display: block;}'],
    providers: [TimesheetService],
    directives: [AgGridNg2, TimesheetLineComponent]
})

export class TimesheetComponent {
    constructor(private timesheetService: TimesheetService, private router: Router) {
        HelperService.log('constructor timesheetComponent');
    }

    editTimesheet: boolean;
    titleTimesheet: string;
    timesheetTotal: string;
    getTimesheetSuccess: boolean = true;
    @Output() ok: EventEmitter<string> = new EventEmitter<string>();
    //@Output() okCreateInvoice: EventEmitter<number> = new EventEmitter<number>();
    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    timesheet: SolsofSpa.Helper.structTimesheet = {
        comment: '',
        debtorID: -1,
        entityID: -1,
        sWeekEnding: HelperService.formatDateForJSon(new Date()),
        timesheetID: -1,
        timesheetLineArray: []
    };
    timesheetVisible: boolean = false;
    //createInvoice: boolean = true;

    ngOnInit() {

        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
    }

    calculateTimesheetTotal = () => {
        var totalMinutes = 0, startTimeMinutes: number, finishTimeMinutes: number, timeoutMinutes: number, i: number;
        for (i = 0; i < this.timesheet.timesheetLineArray.length; i = i + 1) {
            startTimeMinutes = this.timesheet.timesheetLineArray[i].startTimeMinutes;
            finishTimeMinutes = this.timesheet.timesheetLineArray[i].finishTimeMinutes;
            timeoutMinutes = this.timesheet.timesheetLineArray[i].timeoutMinutes;
            totalMinutes = totalMinutes + finishTimeMinutes - startTimeMinutes - timeoutMinutes;
        }
        this.timesheetTotal = HelperService.convertMinutesToTimeString(totalMinutes);
    };

    newTimesheet = (debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        var newTimesheetThis = this;
        if (HelperService.tokenIsValid()) {
            this.debtors = debtors;
            this.titleTimesheet = 'Add Timesheet';
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.timesheet = {
                    comment: '',
                    debtorID: -1,
                    entityID: EntityId,
                    sWeekEnding: HelperService.formatDateForJSon(new Date()),
                    timesheetID: -1,
                    timesheetLineArray: []
                }
                this.gridOptions.api.setRowData(this.timesheet.timesheetLineArray);
                this.timesheetService.getMostRecentTimesheet(EntityId).subscribe(onGetMostRecentTimesheet, logGetMostRecentTimesheet);
            }
            this.editTimesheet = false;
            this.getTimesheetSuccess = true;
            this.calculateTimesheetTotal();
            this.timesheetVisible = true;
        } else {
            this.router.navigate(['Login']);
        }
        function onGetMostRecentTimesheet(mostRecentTimesheet: SolsofSpa.Helper.structTimesheet) {
            if (mostRecentTimesheet !== undefined) {
                newTimesheetThis.timesheet.debtorID = mostRecentTimesheet.debtorID;
                //new date is 7 days after most recent timesheet
                var d: Date = HelperService.translateJavascriptDate(mostRecentTimesheet.sWeekEnding);
                d.setDate(d.getDate() + 7);
                newTimesheetThis.timesheet.sWeekEnding = HelperService.formatDateForJSon(d);
            }
        }
        function logGetMostRecentTimesheet() {
            HelperService.log('GetMostRecentTimesheet Error');
        }
    }

    getTimesheet = (timesheetID: number, debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        var getTimesheetThis = this;
        if (HelperService.tokenIsValid()) {
            this.debtors = debtors;
            var EntityId = GetEntityService.getInstance().getEntityId();
            this.titleTimesheet = 'Edit Timesheet';
            this.timesheetService.getTimesheet(timesheetID, EntityId).subscribe(onGetTimesheet, logTimesheetError);
        } else {
            this.router.navigate(['Login']);
        }
        function onGetTimesheet(timesheet: SolsofSpa.Helper.structTimesheet) {
            getTimesheetThis.editTimesheet = true;
            getTimesheetThis.timesheet = timesheet;
            getTimesheetThis.gridOptions.api.setRowData(timesheet.timesheetLineArray);
            getTimesheetThis.gridOptions.api.sizeColumnsToFit();
            getTimesheetThis.getTimesheetSuccess = true;
            getTimesheetThis.calculateTimesheetTotal();
            getTimesheetThis.timesheetVisible = true;
        }
        function logTimesheetError() {
            HelperService.log('getTimesheet Error');
            getTimesheetThis.getTimesheetSuccess = false;
        }
    }

    //dropdowns are not currently updating model
    onChangeDebtor = (value: any) => {
        var currentTarget: HTMLSelectElement = <HTMLSelectElement>event.currentTarget;
        this.timesheet.debtorID = Number(currentTarget.value);
    }

    cancelTimesheet = () => {
        this.timesheetVisible = false;
    }

    okClicked = () => {
        var okClickedThis = this;
        if (this.editTimesheet) {
            if (HelperService.tokenIsValid()) {
                this.timesheetService.updateTimesheet(this.timesheet).subscribe(updateTimesheetSuccess, logError, complete);
                this.timesheetVisible = false;
            } else {
                this.router.navigate(['Login']);
            }
        } else {
            if (HelperService.tokenIsValid()) {
                this.timesheetService.saveNewTimesheet(this.timesheet).subscribe(updateTimesheetSuccess, logError, complete);
            } else {
                this.router.navigate(['Login']);
            }
        }

        function logError(obj: any) {
            HelperService.log(JSON.stringify(obj));
            alert(JSON.stringify(obj));
        }
        function complete() {
            HelperService.log('timesheet complete');
        }
        function updateTimesheetSuccess(response: Response) {
            okClickedThis.timesheetVisible = false;
            //if (okClickedThis.createInvoice) {
            //  var timesheetID: number = <number>response.json()
            //okClickedThis.okCreateInvoice.emit(timesheetID);
            //} else {
            okClickedThis.ok.emit('');
        }
    }


    ////////////////////////////////////
    //TimesheetLine
    ////////////////////////////////////
    selectedTimesheetLineIndex: number;
    @ViewChild(TimesheetLineComponent) timesheetLineComponent: TimesheetLineComponent;
    bEditTimesheetLine: boolean;

    deleteTimesheetLine = () => {
        this.timesheet.timesheetLineArray.splice(this.selectedTimesheetLineIndex, 1);
        this.gridOptions.api.setRowData(this.timesheet.timesheetLineArray);
    }

    saveTimesheetLine = (savededTimesheetLine: SolsofSpa.Helper.structTimesheetLine) => {
        if (this.bEditTimesheetLine) {
            this.timesheet.timesheetLineArray[this.selectedTimesheetLineIndex] = savededTimesheetLine;
        } else {
            this.timesheet.timesheetLineArray.push(savededTimesheetLine);
        };
        this.gridOptions.api.setRowData(this.timesheet.timesheetLineArray);
        this.calculateTimesheetTotal();
    }

    newTimesheetLine = () => {
        //var newTimesheetLineThis = this;
        var getTimesheetLineDate = (): Date => {
            var d: Date;
            var dow: number;
            if (this.timesheet.timesheetLineArray.length === 0) {
                //if (newTimesheetLineThis.timesheet.timesheetLineArray.length === 0) {
                //set to previous Monday
                d = new Date();
                var dow = d.getDay();
                d.setDate(d.getDate() - dow + 1);
                return d;
            } else {
                var s = this.timesheet.timesheetLineArray[this.timesheet.timesheetLineArray.length - 1].sTimesheetLineDate;
                //var s = newTimesheetLineThis.timesheet.timesheetLineArray[newTimesheetLineThis.timesheet.timesheetLineArray.length - 1].sTimesheetLineDate;
                d = HelperService.translateJavascriptDate(s);
                d.setDate(d.getDate() + 1);
                return d;
            }
        }
        var TimesheetLineDate: Date = getTimesheetLineDate();
        this.bEditTimesheetLine = false;
        this.timesheetLineComponent.newTimesheetLine(TimesheetLineDate);
    }

    ////////////////////////////////////
    //grid
    ////////////////////////////////////
    columnDefs: any[] = [
        {
            headerName: 'Date', field: 'sTimesheetLineDate', cellRenderer: (params: any) => {
                var d: Date = HelperService.translateJavascriptDate(params.value);
                return HelperService.formatDateForDisplay(d, false, false, false);
            }
        },
        { headerName: 'Start Time', field: 'startTimeMinutes', cellClass: 'rightJustify', cellRenderer: (params: any) => { return HelperService.convertMinutesToTimeString(params.value); } },
        { headerName: 'Finish Time', field: 'finishTimeMinutes', cellClass: 'rightJustify', cellRenderer: (params: any) => { return HelperService.convertMinutesToTimeString(params.value); } },
        { headerName: 'Time out', field: 'timeoutMinutes', cellClass: 'rightJustify', cellRenderer: (params: any) => { return HelperService.convertMinutesToTimeString(params.value); } }
    ];
    onRowClicked = (params: any) => {
        //params.node.id seems to be index of data array (not row number!)
        this.selectedTimesheetLineIndex = params.node.id;
    }
    onRowDoubleClicked = (params: any) => {
        var selectedTimesheetLine = <SolsofSpa.Helper.structTimesheetLine>params.data;
        this.bEditTimesheetLine = true;
        this.timesheetLineComponent.displayTimesheetline(selectedTimesheetLine);
    }
    gridOptions: any = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}



