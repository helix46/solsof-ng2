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
                    this.ok = new core_1.EventEmitter();
                    this.cancel = new core_1.EventEmitter();
                    this.cancelTimeSheetLine = function () {
                        _this.cancel.emit(null);
                        _this.timesheetLineVisible = false;
                    };
                    this.okClick = function () {
                        _this.ok.emit(null);
                        _this.timesheetLineVisible = false;
                    };
                    console.log('constructor TimesheetLineComponent');
                }
                TimesheetLineComponent.prototype.ngOnInit = function () {
                    if (this.edit) {
                        this.title = 'Edit Timesheet Line';
                    }
                    else {
                        this.title = 'New Timesheet Line';
                    }
                };
                TimesheetLineComponent.prototype.modalOnKeyup = function () {
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TimesheetLineComponent.prototype, "ok", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TimesheetLineComponent.prototype, "cancel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TimesheetLineComponent.prototype, "edit", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TimesheetLineComponent.prototype, "timesheetLineVisible", void 0);
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
//# sourceMappingURL=timesheetLine.component.js.map