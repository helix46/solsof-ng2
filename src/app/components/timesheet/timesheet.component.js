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
                    this.onGetMostRecentTimesheet = function (mostRecentTimesheet) {
                        var __this = _this;
                        __this.timesheeet.debtorID = mostRecentTimesheet.debtorID;
                        //var d: Date = HelperService.translateJavascriptDate(mostRecentTimesheet.sWeekEnding)
                        __this.weekEnding = helper_service_1.HelperService.getInputFormatDateString(mostRecentTimesheet.sWeekEnding, 7);
                    };
                    this.ongetDebtors = function (debtors) {
                        _this.debtors = debtors;
                    };
                    console.log('constructor timesheetComponent');
                    this.timesheetError = false;
                    this.currentDebtorID = -1;
                    this.timesheeet = {
                        comment: '',
                        debtorID: -1,
                        entityID: GetEntity_service_1.GetEntityService.getInstance().getEntityId(),
                        sWeekEnding: '',
                        timesheetID: -1,
                        timesheetLineArray: []
                    };
                    this.weekEnding;
                }
                TimesheetComponent.prototype.dateChange = function () {
                    //alert(this.weekEnding);
                    var d = new Date(this.weekEnding);
                    alert(d);
                };
                TimesheetComponent.prototype.ngOnInit = function () {
                    var edit = this.routeParams.params['edit'];
                    this.edit = helper_service_1.HelperService.stringToBoolean(edit);
                    if (this.edit) {
                        this.title = 'Edit Timesheet';
                    }
                    else {
                        this.title = 'New Timesheet';
                    }
                    if (helper_service_1.HelperService.tokenIsValid() === false) {
                        this.router.navigate(['Login']);
                    }
                    var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                    if (EntityId === -1) {
                        this.router.navigate(['Entities']);
                    }
                    else {
                        this.debtorsService.getDebtors(EntityId).subscribe(this.ongetDebtors, this.logGetDebtorsError);
                        this.timesheetService.getMostRecentTimesheet(EntityId).subscribe(this.onGetMostRecentTimesheet, this.logError);
                    }
                };
                TimesheetComponent.prototype.logGetDebtorsError = function (obj) {
                    var s = JSON.stringify(obj);
                    console.log(s);
                    alert(s);
                };
                TimesheetComponent.prototype.onChange = function (value) {
                    var currentTarget = event.currentTarget;
                    this.currentDebtorID = Number(currentTarget.value);
                };
                TimesheetComponent.prototype.onSelect = function (debtor) {
                };
                TimesheetComponent.prototype.logError = function (obj) {
                    console.log(JSON.stringify(obj));
                    alert(JSON.stringify(obj));
                    this.timesheetError = true;
                };
                TimesheetComponent.prototype.complete = function () {
                    console.log('timesheet complete');
                    this.router.navigate(['TimeSheets']);
                };
                TimesheetComponent.prototype.okClick = function () {
                    var structTimesheet = {
                        comment: '',
                        debtorID: this.selectedDebtor.debtorID,
                        entityID: GetEntity_service_1.GetEntityService.getInstance().getEntityId(),
                        timesheetID: -1,
                        sWeekEnding: '',
                        timesheetLineArray: []
                    };
                    if (helper_service_1.HelperService.tokenIsValid()) {
                        this.timesheetService.timesheet(structTimesheet).subscribe(function (resp) { return alert('resp'); }, this.logError, this.complete);
                    }
                    else {
                        this.router.navigate(['Login']);
                    }
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