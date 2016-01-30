System.register(['angular2/router', '../../services/helper/helper.service', '../../services/GetEntity/GetEntity.service', 'angular2/core', '../../services/Timesheets/Timesheets.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, helper_service_1, GetEntity_service_1, core_1, Timesheets_service_1;
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
            }],
        execute: function() {
            //import 'rxjs/Rx'; //for map
            TimesheetsComponent = (function () {
                function TimesheetsComponent(TimesheetsService, router) {
                    var _this = this;
                    this.TimesheetsService = TimesheetsService;
                    this.router = router;
                    this.Timesheets = [];
                    this.excludeInactive = true;
                    this.onGetTimesheetsSuccess = function (data) {
                        _this.Timesheets = data;
                        _this.gridOptions.api.setRowData(data);
                        //HelperService.autoSizeAll(this.columnDefs, this.gridOptions);
                        _this.gridOptions.api.sizeColumnsToFit();
                    };
                    /////////////////////////////////////////////////////////////
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
                                return helper_service_1.HelperService.noNullNumber(params.value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
                            },
                            minWidth: 80
                        },
                        { headerName: "Comment", field: "comment", minWidth: 100 },
                        { headerName: "#", field: "invoiceNumber", minWidth: 100 }
                    ];
                    this.onRowDoubleClicked = function (params) {
                        _this.onRowClicked(params);
                        _this.router.navigate(['Transactions', { TimesheetID: _this.selectedTimesheet.timesheetID }]);
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor TimesheetsComponent');
                    window.onresize = function () {
                        _this.gridOptions.api.sizeColumnsToFit();
                        //HelperService.autoSizeAll(this.columnDefs, this.gridOptions);
                    };
                }
                TimesheetsComponent.prototype.ngOnInit = function () {
                    this.loadTimesheets();
                };
                TimesheetsComponent.prototype.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                    this.excludeInactive = chkExcludeInactive.checked;
                    this.loadTimesheets();
                };
                //////////////////////////////////////////////////////////////
                //get data
                TimesheetsComponent.prototype.logError = function (e) {
                    console.log('getTimesheets Error');
                };
                TimesheetsComponent.prototype.complete = function () {
                    console.log('getTimesheets complete');
                };
                TimesheetsComponent.prototype.loadTimesheets = function () {
                    //var TimesheetsComponentThis = this;
                    if (helper_service_1.HelperService.tokenIsValid()) {
                        var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                        if (EntityId === -1) {
                            this.router.navigate(['Entities']);
                        }
                        else {
                            this.TimesheetsService.getTimesheets(EntityId).subscribe(this.onGetTimesheetsSuccess, this.logError, this.complete);
                        }
                    }
                    else {
                        this.router.navigate(['Login']);
                    }
                };
                ;
                TimesheetsComponent.prototype.onRowClicked = function (params) {
                    this.selectedTimesheet = params.data;
                    console.log('Timesheet onRowClicked');
                };
                TimesheetsComponent = __decorate([
                    core_1.Component({
                        selector: 'ledger-accounts',
                        templateUrl: 'src/app/components/Timesheets/Timesheets.component.html',
                        pipes: [],
                        providers: [Timesheets_service_1.TimesheetsService],
                        directives: [window.ag.grid.AgGridNg2]
                    }), 
                    __metadata('design:paramtypes', [Timesheets_service_1.TimesheetsService, router_1.Router])
                ], TimesheetsComponent);
                return TimesheetsComponent;
            })();
            exports_1("TimesheetsComponent", TimesheetsComponent);
        }
    }
});
//# sourceMappingURL=timesheets.component.js.map