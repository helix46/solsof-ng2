/// <reference path="../../solsof.d.ts" />
import {Response} from 'angular2/http';
import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';
import {TimesheetService} from '../../services/timesheet/timesheet.service';
//import {DebtorsService} from '../../services/debtors/debtors.service';
import { Router, RouterLink} from 'angular2/router';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';

@Component({
    selector: 'timesheetModal',
    templateUrl: 'src/app/components/timesheet/timesheet.component.html',
    providers: [TimesheetService]
    //providers: [TimesheetService, DebtorsService]
})


export class TimesheetComponent {
    constructor(private timesheetService: TimesheetService, private router: Router) {
        //constructor(private timesheetService: TimesheetService, private router: Router, private debtorsService: DebtorsService) {
        console.log('constructor timesheetComponent');
        this.currentDebtorID = -1;

    }

    editTimesheet: boolean;
    title: string;
    currentDebtorID: number;
    weekEnding: string;
    timesheetTotal: string;
    getTimesheetSuccess: boolean = true;

    @Output() ok: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    timesheet: SolsofSpa.Helper.structTimesheet = {
        comment: '',
        debtorID: -1,
        entityID: -1,
        sWeekEnding: '',
        timesheetID: -1,
        timesheetLineArray: []
    };
    @Input() debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    //@Input() timesheetVisible: boolean;

    bEditTimesheetLine: boolean;

    //tempTimesheetLine: StructTimesheetLineJs;
    //selectedTimesheetLine: StructTimesheetLineJs;

    ngOnInit() {
        //this.bEditTimesheet = Boolean(this.routeParams.params['edit']);
        //this.bEditTimesheet = <any>this.routeParams.params['edit'];
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
        this.getTimesheetSuccess = true;
        this.calculateTimesheetTotal();
    }


    logTimesheetError = () => {
        console.log('getTimesheet Error');
        this.getTimesheetSuccess = false;
    }

    getTimesheet(timesheetID: number) {
        var EntityId = GetEntityService.getInstance().getEntityId();
        this.timesheetService.getTimesheet(timesheetID, EntityId).subscribe(this.onGetTimesheet, this.logTimesheetError);
    }

    //newTimesheetLine = () => {
    //    var newTimesheetLineThis = this;
    //    this.timesheetLineVisible = true;
    //}

    //modalOnKeyup = (ev: any) => {
    //    this.timesheetLineVisible = false;
    //}

    //cancelTimeSheetLine = () => {
    //    this.timesheetLineVisible = false;
    //}

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

    //onGetMostRecentTimesheet = (mostRecentTimesheet: SolsofSpa.Helper.structTimesheet) => {
    //    if (mostRecentTimesheet !== undefined) {
    //        this.timesheet.debtorID = mostRecentTimesheet.debtorID;
    //    }
    //}

    //onGetTimesheet = (timesheet: SolsofSpa.Helper.structTimesheet) => {
    //    this.timesheet = timesheet;
    //}

    //ongetDebtors = (debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
    //    this.debtors = debtors;
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



//import {Response} from 'angular2/http';
//import {Component, Input, Output, EventEmitter} from 'angular2/core';
//import {HelperService} from '../../services/helper/helper.service';
//import {TimesheetService} from '../../services/timesheet/timesheet.service';
//import { Router, RouterLink} from 'angular2/router';
//import {GetEntityService} from '../../services/GetEntity/GetEntity.service';

//@Component({
//    selector: 'timesheetModal',
//    templateUrl: 'src/app/components/timesheet/timesheet.component.html',
//    providers: [TimesheetService]
//})


//export class TimesheetComponent {
//    constructor(private timesheetService: TimesheetService, private router: Router) {
//        this.timesheet = {
//            comment: '',
//            debtorID: -1,
//            entityID: -1,
//            sWeekEnding: '',
//            timesheetID: -1,
//            timesheetLineArray: []
//        };
//    }

//    ngOnInit() {
//        this.timesheet = {
//            comment: '',
//            debtorID: -1,
//            entityID: -1,
//            sWeekEnding: '',
//            timesheetID: -1,
//            timesheetLineArray: []
//        };
//    }


//    editTimesheet: boolean;
//    title: string;

//    @Output() ok: EventEmitter<any> = new EventEmitter();
//    @Output() cancel: EventEmitter<any> = new EventEmitter();

//    @Input() timesheet: SolsofSpa.Helper.structTimesheet = {
//        comment: '',
//        debtorID: -1,
//        entityID: -1,
//        sWeekEnding: '',
//        timesheetID: -1,
//        timesheetLineArray: []
//    };

//}

