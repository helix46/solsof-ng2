System.register(['angular2/router', 'angular2/src/core/di', 'angular2/http', '../http-handler/http-handler.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, di_1, http_1, http_handler_service_1;
    var TransactionService;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (http_handler_service_1_1) {
                http_handler_service_1 = http_handler_service_1_1;
            }],
        execute: function() {
            TransactionService = (function () {
                function TransactionService(http, router) {
                    this.http = http;
                    this.router = router;
                    console.log('constructor transactionService');
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
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], TransactionService);
                return TransactionService;
            }());
            exports_1("TransactionService", TransactionService);
        }
    }
});
//# sourceMappingURL=transaction.service.js.map