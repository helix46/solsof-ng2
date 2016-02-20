System.register(['angular2/router', '../../services/helper/helper.service', '../../services/GetEntity/GetEntity.service', 'angular2/core', '../../services/Timesheets/Timesheets.service', '../timesheet/timesheet.component', '../../services/debtors/debtors.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, helper_service_1, GetEntity_service_1, core_1, Timesheets_service_1, timesheet_component_1, debtors_service_1;
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
            }],
        execute: function() {
            //import {AgGridNg2} from 'ag-grid-ng2/main';
            //import {GridOptions} from 'ag-grid/main';
            TimesheetsComponent = (function () {
                function TimesheetsComponent(timesheetsService, router, debtorsService) {
                    var _this = this;
                    this.timesheetsService = timesheetsService;
                    this.router = router;
                    this.debtorsService = debtorsService;
                    this.Timesheets = [];
                    this.excludeInactive = true;
                    this.getTimesheetsSuccess = true;
                    this.getDebtorsSuccess = true;
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
                    /////////////////////////////////////////////////////////
                    //get data
                    this.logTimesheetsError = function () {
                        console.log('getTimesheets Error');
                        _this.getTimesheetsSuccess = false;
                    };
                    this.logDebtorsError = function () {
                        console.log('getDebtors Error');
                        _this.getDebtorsSuccess = false;
                    };
                    this.complete = function () {
                        console.log('getTimesheets complete');
                    };
                    this.onGetDebtorsSuccess = function (debtors) {
                        _this.debtors = debtors;
                    };
                    this.onGetTimesheetsSuccess = function (timesheets) {
                        _this.Timesheets = timesheets;
                        _this.gridOptions.api.setRowData(timesheets);
                        _this.gridOptions.api.sizeColumnsToFit();
                        _this.getTimesheetsSuccess = true;
                    };
                    //loadDebtors
                    this.loadDebtors = function () {
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.debtorsService.getDebtors(EntityId).subscribe(_this.onGetDebtorsSuccess, _this.logDebtorsError, _this.complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                    };
                    this.loadTimesheets = function () {
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.timesheetsService.getTimesheets(EntityId).subscribe(_this.onGetTimesheetsSuccess, _this.logTimesheetsError, _this.complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
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
                            headerName: "Minutes",
                            field: "minutes",
                            cellClass: 'rightJustify',
                            cellRenderer: function (params) {
                                return helper_service_1.HelperService.formatMoney(params.value);
                            },
                            minWidth: 80
                        },
                        { headerName: "Comment", field: "comment", minWidth: 100 },
                        { headerName: "#", field: "invoiceNumber", minWidth: 100 }
                    ];
                    this.onRowClicked = function (params) {
                        //this.selectedTimesheet = <SolsofSpa.Api.DataContext.tblTimesheet>params.data;
                        console.log('Timesheet onRowClicked');
                    };
                    this.onRowDoubleClicked = function (params) {
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
                TimesheetsComponent = __decorate([
                    core_1.Component({
                        //selector: 'ledger-accounts',
                        templateUrl: 'src/app/components/Timesheets/Timesheets.component.html',
                        pipes: [],
                        providers: [Timesheets_service_1.TimesheetsService, debtors_service_1.DebtorsService],
                        directives: [window.ag.grid.AgGridNg2, timesheet_component_1.TimesheetComponent]
                    }), 
                    __metadata('design:paramtypes', [Timesheets_service_1.TimesheetsService, router_1.Router, debtors_service_1.DebtorsService])
                ], TimesheetsComponent);
                return TimesheetsComponent;
            })();
            exports_1("TimesheetsComponent", TimesheetsComponent);
        }
    }
});
//# sourceMappingURL=timesheets.component.js.map