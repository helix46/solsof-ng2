System.register(['angular2/core', '../../services/helper/helper.service', '../../services/timesheet/timesheet.service', 'angular2/router', '../../services/GetEntity/GetEntity.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, helper_service_1, timesheet_service_1, router_1, GetEntity_service_1;
    var TimesheetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (timesheet_service_1_1) {
                timesheet_service_1 = timesheet_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            }],
        execute: function() {
            TimesheetComponent = (function () {
                function TimesheetComponent(timesheetService, router) {
                    var _this = this;
                    this.timesheetService = timesheetService;
                    this.router = router;
                    this.getTimesheetSuccess = true;
                    this.ok = new core_1.EventEmitter();
                    this.cancel = new core_1.EventEmitter();
                    this.timesheet = {
                        comment: '',
                        debtorID: -1,
                        entityID: -1,
                        sWeekEnding: '',
                        timesheetID: -1,
                        timesheetLineArray: []
                    };
                    this.calculateTimesheetTotal = function () {
                        var totalMinutes = 0, startTimeMinutes, finishTimeMinutes, timeoutMinutes, i;
                        for (i = 0; i < _this.timesheet.timesheetLineArray.length; i = i + 1) {
                            startTimeMinutes = _this.timesheet.timesheetLineArray[i].startTimeMinutes;
                            finishTimeMinutes = _this.timesheet.timesheetLineArray[i].finishTimeMinutes;
                            timeoutMinutes = _this.timesheet.timesheetLineArray[i].timeoutMinutes;
                            totalMinutes = totalMinutes + finishTimeMinutes - startTimeMinutes - timeoutMinutes;
                        }
                        _this.timesheetTotal = helper_service_1.HelperService.convertMinutesToTimeString(totalMinutes);
                    };
                    this.onGetTimesheet = function (timesheet) {
                        _this.timesheet = timesheet;
                        _this.getTimesheetSuccess = true;
                        _this.calculateTimesheetTotal();
                    };
                    this.logTimesheetError = function () {
                        console.log('getTimesheet Error');
                        _this.getTimesheetSuccess = false;
                    };
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
                    this.logGetDebtorsError = function (obj) {
                        //this.getTimesheetSuccess = false;
                        var s = JSON.stringify(obj);
                        console.log(s);
                        alert(s);
                    };
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
                    this.onChange = function (value) {
                        var currentTarget = event.currentTarget;
                        _this.currentDebtorID = Number(currentTarget.value);
                    };
                    this.onSelect = function (debtor) {
                    };
                    this.logError = function (obj) {
                        console.log(JSON.stringify(obj));
                        alert(JSON.stringify(obj));
                    };
                    this.complete = function () {
                        console.log('timesheet complete');
                        _this.router.navigate(['TimeSheets']);
                    };
                    this.logSuccess = function () {
                        console.log('get success');
                    };
                    this.okClick = function () {
                        var structTimesheet = {
                            comment: '',
                            debtorID: _this.selectedDebtor.debtorID,
                            entityID: GetEntity_service_1.GetEntityService.getInstance().getEntityId(),
                            timesheetID: -1,
                            sWeekEnding: '',
                            timesheetLineArray: []
                        };
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            _this.timesheetService.saveNewTimesheet(_this.timesheet);
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                    };
                    ////////////////////////////////////
                    //grid
                    ////////////////////////////////////
                    this.columnDefs = [
                        {
                            headerName: "Date", field: "timesheetLineDate", cellRenderer: function (params) {
                                return helper_service_1.HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
                            }
                        },
                        { headerName: "Start Time", field: "sStartTime", minWidth: 100 },
                        { headerName: "Finish Time", field: "sFinishTime", minWidth: 100 },
                        { headerName: "Time out", field: "sTimeout", minWidth: 100 }
                    ];
                    this.onRowClicked = function () {
                    };
                    this.onRowDoubleClicked = function () {
                        _this.bEditTimesheetLine = true;
                        //this.showTimesheetLinePopup();
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    //constructor(private timesheetService: TimesheetService, private router: Router, private debtorsService: DebtorsService) {
                    console.log('constructor timesheetComponent');
                    this.currentDebtorID = -1;
                }
                //tempTimesheetLine: StructTimesheetLineJs;
                //selectedTimesheetLine: StructTimesheetLineJs;
                TimesheetComponent.prototype.ngOnInit = function () {
                    //this.bEditTimesheet = Boolean(this.routeParams.params['edit']);
                    //this.bEditTimesheet = <any>this.routeParams.params['edit'];
                    if (helper_service_1.HelperService.tokenIsValid() === false) {
                        this.router.navigate(['Login']);
                    }
                };
                TimesheetComponent.prototype.getTimesheet = function (timesheetID) {
                    var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                    this.timesheetService.getTimesheet(timesheetID, EntityId).subscribe(this.onGetTimesheet, this.logTimesheetError);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TimesheetComponent.prototype, "ok", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TimesheetComponent.prototype, "cancel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TimesheetComponent.prototype, "debtors", void 0);
                TimesheetComponent = __decorate([
                    core_1.Component({
                        selector: 'timesheetModal',
                        templateUrl: 'src/app/components/timesheet/timesheet.component.html',
                        providers: [timesheet_service_1.TimesheetService]
                    }), 
                    __metadata('design:paramtypes', [timesheet_service_1.TimesheetService, router_1.Router])
                ], TimesheetComponent);
                return TimesheetComponent;
            })();
            exports_1("TimesheetComponent", TimesheetComponent);
        }
    }
});
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
//# sourceMappingURL=timesheet.component.js.map