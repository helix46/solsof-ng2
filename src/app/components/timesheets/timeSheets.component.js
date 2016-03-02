System.register(['angular2/router', '../../services/helper/helper.service', '../../services/GetEntity/GetEntity.service', 'angular2/core', '../../services/Timesheets/Timesheets.service', '../timesheet/timesheet.component', '../../services/debtors/debtors.service', '../../services/timesheet/timesheet.service', '../utilities/dialogBox/dialogBox.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, helper_service_1, GetEntity_service_1, core_1, Timesheets_service_1, timesheet_component_1, debtors_service_1, timesheet_service_1, dialogBox_component_1;
    var TimesheetsComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Timesheets_service_1_1) {
                Timesheets_service_1 = Timesheets_service_1_1;
            },
            function (timesheet_component_1_1) {
                timesheet_component_1 = timesheet_component_1_1;
            },
            function (debtors_service_1_1) {
                debtors_service_1 = debtors_service_1_1;
            },
            function (timesheet_service_1_1) {
                timesheet_service_1 = timesheet_service_1_1;
            },
            function (dialogBox_component_1_1) {
                dialogBox_component_1 = dialogBox_component_1_1;
            }],
        execute: function() {
            //import {AgGridNg2} from 'ag-grid-ng2/main';
            //import {GridOptions} from 'ag-grid/main';
            TimesheetsComponent = (function () {
                function TimesheetsComponent(timesheetsService, router, debtorsService, timesheetService) {
                    var _this = this;
                    this.timesheetsService = timesheetsService;
                    this.router = router;
                    this.debtorsService = debtorsService;
                    this.timesheetService = timesheetService;
                    this.Timesheets = [];
                    this.excludeInactive = true;
                    this.getTimesheetsSuccess = true;
                    this.getDebtorsSuccess = true;
                    //selectedTimesheetID: number;
                    //selectedTimesheetIndex: number;
                    //////////////////////////////////////////////////////////
                    //events
                    this.addTimesheet = function () {
                        //this.router.navigate(['Timesheet', { edit: "false" }]);
                        _this.timesheetComponent.newTimesheet(_this.debtors);
                        _this.editTimesheet = false;
                    };
                    this.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                        _this.excludeInactive = chkExcludeInactive.checked;
                        _this.loadTimesheets();
                    };
                    this.loadDebtors = function () {
                        var loadDebtorsThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.debtorsService.getDebtors(EntityId).subscribe(onGetDebtorsSuccess, logDebtorsError, complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                        function logDebtorsError() {
                            console.log('getDebtors Error');
                            loadDebtorsThis.getDebtorsSuccess = false;
                        }
                        function onGetDebtorsSuccess(debtors) {
                            loadDebtorsThis.debtors = debtors;
                        }
                        function complete() {
                            console.log('loadDebtors complete');
                        }
                    };
                    this.loadTimesheets = function () {
                        var loadTimesheetsThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.timesheetsService.getTimesheets(EntityId).subscribe(onGetTimesheetsSuccess, logTimesheetsError, complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                        function onGetTimesheetsSuccess(timesheets) {
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
                    this.deleteTimesheet = function () {
                        var deleteTimesheetThis = _this;
                        var selectedRows = deleteTimesheetThis.gridOptions.api.getSelectedRows();
                        if (selectedRows.length > 0) {
                            _this.dialogBoxComponent.displayDialogBox('Are you sure you want to delete this time sheet?', deleteTimesheetConfirmed);
                        }
                        else {
                            _this.dialogBoxComponent.alert('Please select a Timesheet to delete');
                        }
                        function deleteTimesheetConfirmed() {
                            if (helper_service_1.HelperService.tokenIsValid()) {
                                var obs = deleteTimesheetThis.timesheetService.deleteTimesheet(selectedRows[0].timesheetID);
                                obs.subscribe(onDeleteTimesheetSuccess, function (err) { return logTimesheetsError(err); }, complete);
                            }
                            else {
                                deleteTimesheetThis.router.navigate(['Login']);
                            }
                            function onDeleteTimesheetSuccess() {
                                deleteTimesheetThis.loadTimesheets();
                            }
                            function logTimesheetsError(err) {
                                console.log('deleteTimesheet Error');
                            }
                            function complete() {
                                console.log('loadTimesheets complete');
                            }
                        }
                    };
                    ////////////////////////////////////////////////
                    //grid
                    this.columnDefs = [
                        { headerName: "Id", field: "timesheetID", hide: true },
                        {
                            headerName: "Week Ending",
                            field: "weekEnding",
                            cellRenderer: function (params) {
                                return helper_service_1.HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
                            },
                            cellClass: 'rightJustify',
                        },
                        { headerName: "Name", field: "debtorName", minWidth: 100 },
                        {
                            headerName: "Hours",
                            field: "minutes",
                            cellClass: 'rightJustify',
                            cellRenderer: function (params) {
                                var totalMinutes = params.value;
                                return helper_service_1.HelperService.convertMinutesToTimeString(totalMinutes);
                            },
                            minWidth: 80
                        },
                        { headerName: "Comment", field: "comment", minWidth: 100 },
                        { headerName: "#", field: "invoiceNumber", minWidth: 100 }
                    ];
                    this.onRowClicked = function (params) {
                        //do nothing
                    };
                    this.onRowDoubleClicked = function (params) {
                        //this.onRowClicked(params);
                        var selectedTimesheet = params.data;
                        _this.timesheetComponent.getTimesheet(selectedTimesheet.timesheetID, _this.debtors);
                        _this.editTimesheet = true;
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor TimesheetsComponent');
                    this.getTimesheetsSuccess = true;
                    //window.onresize = () => {
                    //    this.gridOptions.api.sizeColumnsToFit();
                    //};
                }
                TimesheetsComponent.prototype.ngOnInit = function () {
                    this.loadTimesheets();
                    this.loadDebtors();
                    //need this
                };
                __decorate([
                    core_1.ViewChild(timesheet_component_1.TimesheetComponent), 
                    __metadata('design:type', timesheet_component_1.TimesheetComponent)
                ], TimesheetsComponent.prototype, "timesheetComponent", void 0);
                __decorate([
                    core_1.ViewChild(dialogBox_component_1.DialogBoxComponent), 
                    __metadata('design:type', dialogBox_component_1.DialogBoxComponent)
                ], TimesheetsComponent.prototype, "dialogBoxComponent", void 0);
                TimesheetsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'src/app/components/Timesheets/Timesheets.component.html',
                        pipes: [],
                        providers: [Timesheets_service_1.TimesheetsService, debtors_service_1.DebtorsService, timesheet_service_1.TimesheetService],
                        directives: [window.ag.grid.AgGridNg2, timesheet_component_1.TimesheetComponent, dialogBox_component_1.DialogBoxComponent]
                    }), 
                    __metadata('design:paramtypes', [Timesheets_service_1.TimesheetsService, router_1.Router, debtors_service_1.DebtorsService, timesheet_service_1.TimesheetService])
                ], TimesheetsComponent);
                return TimesheetsComponent;
            })();
            exports_1("TimesheetsComponent", TimesheetsComponent);
        }
    }
});
//# sourceMappingURL=timesheets.component.js.map