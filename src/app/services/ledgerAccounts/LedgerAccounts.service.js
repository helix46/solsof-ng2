System.register(['angular2/router', 'angular2/src/core/di', 'angular2/http', '../helper/helper.service', '../http-handler/http-handler.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, di_1, http_1, helper_service_1, http_handler_service_1;
    var LedgerAccountsService;
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
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (http_handler_service_1_1) {
                http_handler_service_1 = http_handler_service_1_1;
            }],
        execute: function() {
            LedgerAccountsService = (function () {
                function LedgerAccountsService(http, router) {
                    this.http = http;
                    this.router = router;
                    console.log('constructor LedgerAccountsService');
                }
                LedgerAccountsService.prototype.parseResponse = function (res) {
                    return res.json();
                };
                LedgerAccountsService.prototype.getLedgerAccounts = function (excludeInactive) {
                    var parameters = [];
                    var EntityId = helper_service_1.HelperService.getInstance().getEntityId();
                    if (EntityId === -1) {
                        this.router.navigate(['Entities']);
                        return null;
                    }
                    else {
                        parameters[0] = {
                            name: 'entityID',
                            value: EntityId.toString()
                        };
                        parameters[1] = {
                            name: 'excludeInactive',
                            value: helper_service_1.HelperService.getInstance().booleanToString(excludeInactive)
                        };
                        var httpHandlerService = new http_handler_service_1.HttpHandlerService(this.http);
                        return httpHandlerService.getObject(parameters, 'api/ledgerAccounts');
                    }
                };
                LedgerAccountsService = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], LedgerAccountsService);
                return LedgerAccountsService;
            })();
            exports_1("LedgerAccountsService", LedgerAccountsService);
        }
    }
});
//# sourceMappingURL=LedgerAccounts.service.js.map