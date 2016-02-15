System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var TimesheetLineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TimesheetLineComponent = (function () {
                function TimesheetLineComponent() {
                    var _this = this;
                    this.saver = new core_1.EventEmitter();
                    this.displayTimesheetline = function (selectedTimesheetLine) {
                        _this.titleTimesheetLine = 'Edit Timesheet Line';
                        _this.timesheetLineDate = selectedTimesheetLine.sTimesheetLineDate;
                        _this.startHours = Math.floor(selectedTimesheetLine.startTimeMinutes / 60);
                        _this.startMinutes = selectedTimesheetLine.startTimeMinutes % 60;
                        _this.finishHours = Math.floor(selectedTimesheetLine.finishTimeMinutes / 60);
                        _this.finishMinutes = selectedTimesheetLine.finishTimeMinutes % 60;
                        _this.timeoutHours = Math.floor(selectedTimesheetLine.timeoutMinutes / 60);
                        _this.timeoutMinutes = selectedTimesheetLine.timeoutMinutes % 60;
                        _this.timesheetLineVisible = true;
                    };
                    this.cancelTimeSheetLine = function () {
                        _this.timesheetLineVisible = false;
                    };
                    console.log('constructor TimesheetLineComponent');
                }
                TimesheetLineComponent.prototype.ngOnInit = function () {
                };
                TimesheetLineComponent.prototype.modalOnKeyup = function () {
                };
                TimesheetLineComponent.prototype.saveTimeSheetLine = function () {
                    var selectedTimesheetLine = {
                        sTimesheetLineDate: this.timesheetLineDate,
                        startTimeMinutes: this.startHours * 60 + this.startMinutes,
                        finishTimeMinutes: this.finishHours * 60 + this.finishMinutes,
                        timeoutMinutes: this.timeoutHours * 60 + this.timeoutMinutes
                    };
                    this.saver.emit(selectedTimesheetLine);
                    this.timesheetLineVisible = false;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TimesheetLineComponent.prototype, "saver", void 0);
                TimesheetLineComponent = __decorate([
                    core_1.Component({
                        selector: 'timesheet-line',
                        templateUrl: 'src/app/components/timesheetLine/timesheetLine.component.html',
                        styleUrls: ['src/app/components/timesheetLine/timesheetLine.component.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimesheetLineComponent);
                return TimesheetLineComponent;
            })();
            exports_1("TimesheetLineComponent", TimesheetLineComponent);
        }
    }
});
//# sourceMappingURL=timesheetline.component.js.map