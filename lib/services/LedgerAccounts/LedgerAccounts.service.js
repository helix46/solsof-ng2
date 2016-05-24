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
var helper_service_1 = require('../helper/helper.service');
var http_handler_service_1 = require('../http-handler/http-handler.service');
var LedgerAccountsService = (function () {
    function LedgerAccountsService(http, router) {
        this.http = http;
        this.router = router;
        helper_service_1.HelperService.logError('constructor LedgerAccountsService');
    }
    LedgerAccountsService.prototype.parseResponse = function (res) {
        return res.json();
    };
    LedgerAccountsService.prototype.getLedgerAccounts = function (excludeInactive, EntityId) {
        var parameters = [];
        parameters[0] = {
            name: 'entityID',
            value: EntityId.toString()
        };
        parameters[1] = {
            name: 'excludeInactive',
            value: helper_service_1.HelperService.booleanToString(excludeInactive)
        };
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        return httpHandlerService.getObject(parameters, 'api/ledgerAccounts');
    };
    LedgerAccountsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], LedgerAccountsService);
    return LedgerAccountsService;
}());
exports.LedgerAccountsService = LedgerAccountsService;
//# sourceMappingURL=LedgerAccounts.service.js.map