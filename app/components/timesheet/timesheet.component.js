"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var helper_service_1 = require('../../services/helper/helper.service');
var timesheet_service_1 = require('../../services/timesheet/timesheet.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var GetEntity_service_1 = require('../../services/GetEntity/GetEntity.service');
var timesheetline_component_1 = require('../timesheetline/timesheetline.component');
var main_1 = require('ag-grid-ng2/main');
var TimesheetComponent = (function () {
    function TimesheetComponent(timesheetService, router) {
        var _this = this;
        this.timesheetService = timesheetService;
        this.router = router;
        this.getTimesheetSuccess = true;
        this.ok = new core_1.EventEmitter();
        this.okCreateInvoice = new core_1.EventEmitter();
        this.timesheet = {
            comment: '',
            debtorID: -1,
            entityID: -1,
            sWeekEnding: helper_service_1.HelperService.formatDateForJSon(new Date()),
            timesheetID: -1,
            timesheetLineArray: []
        };
        this.timesheetVisible = false;
        this.createInvoice = true;
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
        this.newTimesheet = function (debtors) {
            var newTimesheetThis = _this;
            if (helper_service_1.HelperService.tokenIsValid()) {
                _this.debtors = debtors;
                _this.titleTimesheet = 'Add Timesheet';
                var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                if (EntityId === -1) {
                    _this.router.navigate(['Entities']);
                }
                else {
                    _this.timesheet = {
                        comment: '',
                        debtorID: -1,
                        entityID: EntityId,
                        sWeekEnding: helper_service_1.HelperService.formatDateForJSon(new Date()),
                        timesheetID: -1,
                        timesheetLineArray: []
                    };
                    _this.gridOptions.api.setRowData(_this.timesheet.timesheetLineArray);
                    _this.timesheetService.getMostRecentTimesheet(EntityId).subscribe(onGetMostRecentTimesheet, logGetMostRecentTimesheet);
                }
                _this.editTimesheet = false;
                _this.getTimesheetSuccess = true;
                _this.calculateTimesheetTotal();
                _this.timesheetVisible = true;
            }
            else {
                _this.router.navigate(['Login']);
            }
            function onGetMostRecentTimesheet(mostRecentTimesheet) {
                if (mostRecentTimesheet !== undefined) {
                    newTimesheetThis.timesheet.debtorID = mostRecentTimesheet.debtorID;
                    var d = helper_service_1.HelperService.translateJavascriptDate(mostRecentTimesheet.sWeekEnding);
                    d.setDate(d.getDate() + 7);
                    newTimesheetThis.timesheet.sWeekEnding = helper_service_1.HelperService.formatDateForJSon(d);
                }
            }
            function logGetMostRecentTimesheet() {
                console.log('GetMostRecentTimesheet Error');
            }
        };
        this.getTimesheet = function (timesheetID, debtors) {
            var getTimesheetThis = _this;
            if (helper_service_1.HelperService.tokenIsValid()) {
                _this.debtors = debtors;
                var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                _this.titleTimesheet = 'Edit Timesheet';
                _this.timesheetService.getTimesheet(timesheetID, EntityId).subscribe(onGetTimesheet, logTimesheetError);
            }
            else {
                _this.router.navigate(['Login']);
            }
            function onGetTimesheet(timesheet) {
                getTimesheetThis.editTimesheet = true;
                getTimesheetThis.timesheet = timesheet;
                getTimesheetThis.gridOptions.api.setRowData(timesheet.timesheetLineArray);
                getTimesheetThis.gridOptions.api.sizeColumnsToFit();
                getTimesheetThis.getTimesheetSuccess = true;
                getTimesheetThis.calculateTimesheetTotal();
                getTimesheetThis.timesheetVisible = true;
            }
            function logTimesheetError() {
                console.log('getTimesheet Error');
                getTimesheetThis.getTimesheetSuccess = false;
            }
        };
        this.onChangeDebtor = function (value) {
            var currentTarget = event.currentTarget;
            _this.timesheet.debtorID = Number(currentTarget.value);
        };
        this.cancelTimesheet = function () {
            _this.timesheetVisible = false;
        };
        this.okClicked = function () {
            var okClickedThis = _this;
            if (_this.editTimesheet) {
                if (helper_service_1.HelperService.tokenIsValid()) {
                    _this.timesheetService.updateTimesheet(_this.timesheet).subscribe(updateTimesheetSuccess, logError, complete);
                    _this.timesheetVisible = false;
                }
                else {
                    _this.router.navigate(['Login']);
                }
            }
            else {
                if (helper_service_1.HelperService.tokenIsValid()) {
                    _this.timesheetService.saveNewTimesheet(_this.timesheet).subscribe(updateTimesheetSuccess, logError, complete);
                }
                else {
                    _this.router.navigate(['Login']);
                }
            }
            function logError(obj) {
                console.log(JSON.stringify(obj));
                alert(JSON.stringify(obj));
            }
            function complete() {
                console.log('timesheet complete');
            }
            function updateTimesheetSuccess(response) {
                var timesheetID = response.json();
                okClickedThis.timesheetVisible = false;
                if (okClickedThis.createInvoice) {
                    okClickedThis.okCreateInvoice.emit(timesheetID);
                }
                else {
                    okClickedThis.ok.emit('');
                }
            }
        };
        this.deleteTimesheetLine = function () {
            _this.timesheet.timesheetLineArray.splice(_this.selectedTimesheetLineIndex, 1);
            _this.gridOptions.api.setRowData(_this.timesheet.timesheetLineArray);
        };
        this.saveTimesheetLine = function (savededTimesheetLine) {
            if (_this.bEditTimesheetLine) {
                _this.timesheet.timesheetLineArray[_this.selectedTimesheetLineIndex] = savededTimesheetLine;
            }
            else {
                _this.timesheet.timesheetLineArray.push(savededTimesheetLine);
            }
            ;
            _this.gridOptions.api.setRowData(_this.timesheet.timesheetLineArray);
            _this.calculateTimesheetTotal();
        };
        this.newTimesheetLine = function () {
            var getTimesheetLineDate = function () {
                var d;
                var dow;
                if (_this.timesheet.timesheetLineArray.length === 0) {
                    d = new Date();
                    var dow = d.getDay();
                    d.setDate(d.getDate() - dow + 1);
                    return d;
                }
                else {
                    var s = _this.timesheet.timesheetLineArray[_this.timesheet.timesheetLineArray.length - 1].sTimesheetLineDate;
                    d = helper_service_1.HelperService.translateJavascriptDate(s);
                    d.setDate(d.getDate() + 1);
                    return d;
                }
            };
            var TimesheetLineDate = getTimesheetLineDate();
            _this.bEditTimesheetLine = false;
            _this.timesheetLineComponent.newTimesheetLine(TimesheetLineDate);
        };
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
        this.onRowClicked = function (params) {
            _this.selectedTimesheetLineIndex = params.node.id;
        };
        this.onRowDoubleClicked = function (params) {
            var selectedTimesheetLine = params.data;
            _this.bEditTimesheetLine = true;
            _this.timesheetLineComponent.displayTimesheetline(selectedTimesheetLine);
        };
        this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
        console.log('constructor timesheetComponent');
    }
    TimesheetComponent.prototype.ngOnInit = function () {
        if (helper_service_1.HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimesheetComponent.prototype, "ok", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimesheetComponent.prototype, "okCreateInvoice", void 0);
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
            directives: [main_1.AgGridNg2, timesheetline_component_1.TimesheetLineComponent]
        }), 
        __metadata('design:paramtypes', [timesheet_service_1.TimesheetService, router_deprecated_1.Router])
    ], TimesheetComponent);
    return TimesheetComponent;
}());
exports.TimesheetComponent = TimesheetComponent;
//# sourceMappingURL=timesheet.component.js.map