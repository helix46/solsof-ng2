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
var router_deprecated_1 = require('@angular/router-deprecated');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var http_handler_service_1 = require('../http-handler/http-handler.service');
var TimesheetService = (function () {
    function TimesheetService(http, router) {
        this.http = http;
        this.router = router;
        console.log('constructor timesheetService');
    }
    TimesheetService.prototype.getMostRecentTimesheet = function (EntityId) {
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        var parameters = [];
        parameters[0] = {
            name: 'entityID',
            value: EntityId.toString()
        };
        return httpHandlerService.getObject(parameters, 'api/timesheet/getMostRecentTimesheet');
    };
    TimesheetService.prototype.saveNewTimesheet = function (structTimesheet) {
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        return httpHandlerService.postObject(structTimesheet, 'api/timesheet');
    };
    TimesheetService.prototype.updateTimesheet = function (timesheet) {
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        return httpHandlerService.putObject(timesheet, 'api/timesheet');
    };
    TimesheetService.prototype.deleteTimesheet = function (timesheetID) {
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        var parameters = [];
        parameters[0] = {
            name: 'timesheetID',
            value: timesheetID.toString()
        };
        return httpHandlerService.deleteObject(parameters, 'api/timesheet');
    };
    TimesheetService.prototype.getTimesheet = function (timesheetID, entityID) {
        var parameters = [];
        parameters[0] = {
            name: 'timesheetID',
            value: timesheetID.toString()
        };
        parameters[1] = {
            name: 'entityID',
            value: entityID.toString()
        };
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        return httpHandlerService.getObject(parameters, 'api/timesheet');
    };
    TimesheetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], TimesheetService);
    return TimesheetService;
}());
exports.TimesheetService = TimesheetService;
//# sourceMappingURL=timesheet.service.js.map