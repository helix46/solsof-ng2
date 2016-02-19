System.register(['angular2/core', '../../services/helper/helper.service', '../../services/timesheet/timesheet.service', 'angular2/router', '../../services/GetEntity/GetEntity.service', '../timesheetline/timesheetline.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, helper_service_1, timesheet_service_1, router_1, GetEntity_service_1, timesheetline_component_1;
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
            },
            function (timesheetline_component_1_1) {
                timesheetline_component_1 = timesheetline_component_1_1;
            }],
        execute: function() {
            //import {AgGridNg2} from 'ag-grid-ng2/main';
            //import {GridOptions} from 'ag-grid/main';
            TimesheetComponent = (function () {
                function TimesheetComponent(timesheetService, router) {
                    var _this = this;
                    this.timesheetService = timesheetService;
                    this.router = router;
                    this.getTimesheetSuccess = true;
                    this.ok = new core_1.EventEmitter();
                    this.timesheet = {
                        comment: '',
                        debtorID: -1,
                        entityID: -1,
                        sWeekEnding: '',
                        timesheetID: -1,
                        timesheetLineArray: []
                    };
                    this.timesheetVisible = false;
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
                        _this.editTimesheet = true;
                        _this.timesheet = timesheet;
                        _this.gridOptions.api.setRowData(timesheet.timesheetLineArray);
                        _this.gridOptions.api.sizeColumnsToFit();
                        _this.getTimesheetSuccess = true;
                        _this.calculateTimesheetTotal();
                        _this.timesheetVisible = true;
                    };
                    this.logTimesheetError = function () {
                        console.log('getTimesheet Error');
                        _this.getTimesheetSuccess = false;
                    };
                    this.saveTimesheet = function () {
                    };
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
                    };
                    this.logSuccess = function () {
                        console.log('get success');
                    };
                    this.cancelTimesheet = function () {
                        _this.timesheetVisible = false;
                    };
                    this.updateTimesheetSuccess = function () {
                        _this.ok.emit('');
                    };
                    this.okClicked = function () {
                        if (_this.editTimesheet) {
                            if (helper_service_1.HelperService.tokenIsValid()) {
                                _this.timesheetService.updateTimesheet(_this.timesheet).subscribe(_this.updateTimesheetSuccess, _this.logError, _this.complete);
                                _this.timesheetVisible = false;
                            }
                            else {
                                _this.router.navigate(['Login']);
                            }
                        }
                    };
                    this.saveTimesheetLine = function (savededTimesheetLine) {
                        _this.timesheet.timesheetLineArray[_this.selectedTimesheetLineIndex] = savededTimesheetLine;
                        _this.gridOptions.api.setRowData(_this.timesheet.timesheetLineArray);
                        _this.calculateTimesheetTotal();
                    };
                    ////////////////////////////////////
                    //grid
                    ////////////////////////////////////
                    this.columnDefs = [
                        {
                            headerName: 'Date', field: 'sTimesheetLineDate', cellRenderer: function (params) {
                                var d = helper_service_1.HelperService.translateJavascriptDate(params.value);
                                return helper_service_1.HelperService.formatDateForDisplay(d, false, false, false);
                            }
                        },
                        { headerName: 'Start Time', field: 'startTimeMinutes', cellClass: 'rightJustify', cellRenderer: function (params) { return helper_service_1.HelperService.convertMinutesToTimeString(params.value); } },
                        { headerName: 'Finish Time', field: 'finishTimeMinutes', cellClass: 'rightJustify', cellRenderer: function (params) { return helper_service_1.HelperService.convertMinutesToTimeString(params.value); } },
                        { headerName: 'Time out', field: 'timeoutMinutes', cellClass: 'rightJustify', cellRenderer: function (params) { return helper_service_1.HelperService.convertMinutesToTimeString(params.value); } }
                    ];
                    this.onRowClicked = function () {
                    };
                    this.onRowDoubleClicked = function (params) {
                        var selectedTimesheetLine = params.data;
                        //params.node.id seems to be index of data array (not row number!)
                        _this.selectedTimesheetLineIndex = params.node.id;
                        _this.timesheetLineComponent.displayTimesheetline(selectedTimesheetLine);
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor timesheetComponent');
                    this.currentDebtorID = -1;
                }
                TimesheetComponent.prototype.ngOnInit = function () {
                    if (helper_service_1.HelperService.tokenIsValid() === false) {
                        this.router.navigate(['Login']);
                    }
                };
                TimesheetComponent.prototype.getTimesheet = function (timesheetID, debtors) {
                    if (helper_service_1.HelperService.tokenIsValid()) {
                        this.debtors = debtors;
                        var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                        this.titleTimesheet = 'Edit Timesheet';
                        this.timesheetService.getTimesheet(timesheetID, EntityId).subscribe(this.onGetTimesheet, this.logTimesheetError);
                    }
                    else {
                        this.router.navigate(['Login']);
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TimesheetComponent.prototype, "ok", void 0);
                __decorate([
                    core_1.ViewChild(timesheetline_component_1.TimesheetLineComponent), 
                    __metadata('design:type', timesheetline_component_1.TimesheetLineComponent)
                ], TimesheetComponent.prototype, "timesheetLineComponent", void 0);
                TimesheetComponent = __decorate([
                    core_1.Component({
                        selector: 'timesheetModal',
                        templateUrl: 'src/app/components/timesheet/timesheet.component.html',
                        styles: ['.modalSolsofVisible {display: block;}'],
                        providers: [timesheet_service_1.TimesheetService],
                        directives: [window.ag.grid.AgGridNg2, timesheetline_component_1.TimesheetLineComponent]
                    }), 
                    __metadata('design:paramtypes', [timesheet_service_1.TimesheetService, router_1.Router])
                ], TimesheetComponent);
                return TimesheetComponent;
            })();
            exports_1("TimesheetComponent", TimesheetComponent);
        }
    }
});
//# sourceMappingURL=timesheet.component.js.map