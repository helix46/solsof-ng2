/// <reference path="../../solsof.d.ts" />
import {Response} from 'angular2/http';
import {Component, Input, Output, EventEmitter, ViewChild} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';
import {TimesheetService} from '../../services/timesheet/timesheet.service';
import { Router, RouterLink} from 'angular2/router';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {TimesheetLineComponent} from '../timesheetline/timesheetline.component';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'timesheetModal',
    templateUrl: 'src/app/components/timesheet/timesheet.component.html',
    styles: ['.modalSolsofVisible {display: block;}'],
    providers: [TimesheetService],
    directives: [AgGridNg2, TimesheetLineComponent]
})

export class TimesheetComponent {
    constructor(private timesheetService: TimesheetService, private router: Router) {
        console.log('constructor timesheetComponent');
        this.currentDebtorID = -1;

    }

    editTimesheet: boolean;
    titleTimesheet: string;
    title: string;
    currentDebtorID: number;
    weekEnding: string;
    timesheetTotal: string;
    getTimesheetSuccess: boolean = true;
    selectedTimesheetLineIndex: number;
    @Output() ok: EventEmitter<any> = new EventEmitter();

    timesheet: SolsofSpa.Helper.structTimesheet = {
        comment: '',
        debtorID: -1,
        entityID: -1,
        sWeekEnding: '',
        timesheetID: -1,
        timesheetLineArray: []
    };
    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    @ViewChild(TimesheetLineComponent) timesheetLineComponent: TimesheetLineComponent;

    timesheetVisible: boolean = false;

    bEditTimesheetLine: boolean;

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

    onGetTimesheet = (timesheet: SolsofSpa.Helper.structTimesheet) => {
        this.timesheet = timesheet;
        this.gridOptions.api.setRowData(timesheet.timesheetLineArray);
        this.gridOptions.api.sizeColumnsToFit();
        this.getTimesheetSuccess = true;
        this.calculateTimesheetTotal();
        this.timesheetVisible = true;
    }


    logTimesheetError = () => {
        console.log('getTimesheet Error');
        this.getTimesheetSuccess = false;
    }

    saveTimesheet = () => {

    }

    getTimesheet(timesheetID: number, debtors: SolsofSpa.Api.DataContext.tblDebtor[]) {
        if (HelperService.tokenIsValid()) {
            this.debtors = debtors;
            var EntityId = GetEntityService.getInstance().getEntityId();
            this.titleTimesheet = 'Edit Timesheet';
            this.timesheetService.getTimesheet(timesheetID, EntityId).subscribe(this.onGetTimesheet, this.logTimesheetError);
        } else {
            this.router.navigate(['Login']);
        }
    }

    logGetDebtorsError = (obj: any) => {
        //this.getTimesheetSuccess = false;
        var s = JSON.stringify(obj);
        console.log(s);
        alert(s);
    }

    //onGetMostRecentTimesheet = (mostRecentTimesheet: SolsofSpa.Helper.structTimesheet) => {
    //    if (mostRecentTimesheet !== undefined) {
    //        this.timesheet.debtorID = mostRecentTimesheet.debtorID;
    //    }
    //}


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

    cancelTimesheet = () => {
        this.timesheetVisible = false;
    }

    okClicked = () => {
        //var structTimesheet: SolsofSpa.Helper.structTimesheet = {
        //    comment: '',
        //    debtorID: this.selectedDebtor.debtorID,
        //    entityID: GetEntityService.getInstance().getEntityId(),
        //    timesheetID: -1,
        //    sWeekEnding: '',
        //    timesheetLineArray: []
        //}
        //if (HelperService.tokenIsValid()) {
        //    this.timesheetService.saveNewTimesheet(this.timesheet);
        //} else {
        //    this.router.navigate(['Login']);
        //}
        this.timesheetVisible = true
        this.ok.emit('');
    }

    saveTimesheetLine = (savededTimesheetLine: SolsofSpa.Helper.structTimesheetLine) => {
        this.timesheet.timesheetLineArray[this.selectedTimesheetLineIndex] = savededTimesheetLine;
        this.gridOptions.api.setRowData(this.timesheet.timesheetLineArray);
        this.calculateTimesheetTotal();
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
    onRowClicked = () => {
    }
    onRowDoubleClicked = (params: any) => {
        var selectedTimesheetLine = <SolsofSpa.Helper.structTimesheetLine>params.data;
        //params.node.id seems to be index of data array (not row number!)
        this.selectedTimesheetLineIndex = params.node.id;
        this.timesheetLineComponent.displayTimesheetline(selectedTimesheetLine);
    }
    gridOptions: GridOptions = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}



