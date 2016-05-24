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
var TransactionService = (function () {
    function TransactionService(http, router) {
        this.http = http;
        this.router = router;
        helper_service_1.HelperService.log('constructor transactionService');
    }
    TransactionService.prototype.saveNewTransaction = function (structTransaction) {
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        return httpHandlerService.postObject(structTransaction, 'api/transaction');
    };
    TransactionService.prototype.updateTransaction = function (transaction) {
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        return httpHandlerService.putObject(transaction, 'api/transaction');
    };
    TransactionService.prototype.deleteTransaction = function (transactionID) {
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        var parameters = [];
        parameters[0] = {
            name: 'transactionID',
            value: transactionID.toString()
        };
        return httpHandlerService.deleteObject(parameters, 'api/transaction');
    };
    TransactionService.prototype.getTransaction = function (transactionID, entityID) {
        var parameters = [];
        parameters[0] = {
            name: 'transactionID',
            value: transactionID.toString()
        };
        parameters[1] = {
            name: 'entityID',
            value: entityID.toString()
        };
        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
        return httpHandlerService.getObject(parameters, 'api/transaction');
    };
    TransactionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map