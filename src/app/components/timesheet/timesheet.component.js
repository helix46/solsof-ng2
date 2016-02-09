System.register(['angular2/core', '../../services/helper/helper.service', '../../services/timesheet/timesheet.service', '../../services/debtors/debtors.service', 'angular2/router', '../../services/GetEntity/GetEntity.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, helper_service_1, timesheet_service_1, debtors_service_1, router_1, GetEntity_service_1;
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
            function (debtors_service_1_1) {
                debtors_service_1 = debtors_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            }],
        execute: function() {
            TimesheetComponent = (function () {
                function TimesheetComponent(timesheetService, router, debtorsService, routeParams) {
                    var _this = this;
                    this.timesheetService = timesheetService;
                    this.router = router;
                    this.debtorsService = debtorsService;
                    this.routeParams = routeParams;
                    this.newTimesheetLine = function () {
                        var newTimesheetLineThis = _this;
                        _this.timesheetLineVisible = true;
                    };
                    this.modalOnKeyup = function (ev) {
                        _this.timesheetLineVisible = false;
                    };
                    this.cancelTimeSheetLine = function () {
                        _this.timesheetLineVisible = false;
                    };
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
                    this.onGetMostRecentTimesheet = function (mostRecentTimesheet) {
                        _this.timesheeet.debtorID = mostRecentTimesheet.debtorID;
                        _this.weekEnding = helper_service_1.HelperService.getInputFormatDateString(mostRecentTimesheet.sWeekEnding, 7);
                    };
                    this.onGetTimesheet = function (timesheet) {
                        _this.timesheeet = timesheet;
                        _this.weekEnding = helper_service_1.HelperService.getInputFormatDateString(timesheet.sWeekEnding, 0);
                    };
                    this.ongetDebtors = function (debtors) {
                        _this.debtors = debtors;
                    };
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
                    console.log('constructor timesheetComponent');
                    this.currentDebtorID = -1;
                    this.timesheeet = {
                        comment: '',
                        debtorID: -1,
                        entityID: GetEntity_service_1.GetEntityService.getInstance().getEntityId(),
                        sWeekEnding: '',
                        timesheetID: -1,
                        timesheetLineArray: []
                    };
                }
                TimesheetComponent.prototype.ngOnInit = function () {
                    this.bEditTimesheet = Boolean(this.routeParams.params['edit']);
                    //this.bEditTimesheet = <any>this.routeParams.params['edit'];
                    if (helper_service_1.HelperService.tokenIsValid() === false) {
                        this.router.navigate(['Login']);
                    }
                    var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                    if (EntityId === -1) {
                        this.router.navigate(['Entities']);
                    }
                    else {
                        this.debtorsService.getDebtors(EntityId).subscribe(this.ongetDebtors, this.logGetDebtorsError);
                        if (this.bEditTimesheet) {
                            this.title = 'Edit Timesheet';
                            this.timesheetID = Number(this.routeParams.params['timesheetID']);
                            this.timesheetService.getTimesheet(this.timesheetID, EntityId).subscribe(this.onGetTimesheet, this.logError);
                        }
                        else {
                            this.title = 'New Timesheet';
                            this.timesheetService.getMostRecentTimesheet(EntityId).subscribe(this.onGetMostRecentTimesheet, this.logError);
                        }
                    }
                };
                TimesheetComponent.prototype.dateChange = function () {
                };
                TimesheetComponent = __decorate([
                    core_1.Component({
                        selector: 'timesheet',
                        templateUrl: 'src/app/components/timesheet/timesheet.component.html',
                        providers: [timesheet_service_1.TimesheetService, debtors_service_1.DebtorsService]
                    }), 
                    __metadata('design:paramtypes', [timesheet_service_1.TimesheetService, router_1.Router, debtors_service_1.DebtorsService, router_1.RouteParams])
                ], TimesheetComponent);
                return TimesheetComponent;
            })();
            exports_1("TimesheetComponent", TimesheetComponent);
        }
    }
});
//# sourceMappingURL=timesheet.component.js.map