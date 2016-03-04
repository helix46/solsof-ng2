System.register(['angular2/router', 'angular2/src/core/di', 'angular2/http', '../helper/helper.service'], function(exports_1, context_1) {
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
    var router_1, di_1, http_1, helper_service_1;
    var LoginService;
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
            }],
        execute: function() {
            LoginService = (function () {
                function LoginService(http, router, callback) {
                    this.http = http;
                    this.router = router;
                    this.callback = callback;
                    console.log('constructor LoginService');
                }
                LoginService.prototype.storeToken = function (response, userName) {
                    var t = response.json();
                    helper_service_1.HelperService.saveTokenToStorage(userName, t);
                    this.callback();
                };
                ;
                LoginService.prototype.logError = function () {
                    window.alert('Error logging in');
                };
                ;
                LoginService.prototype.authenticate = function (username, password) {
                    var _this = this;
                    var usernamePlusPassword = "grant_type=password&username=" + username + "&password=" + password;
                    var headers = new http_1.Headers();
                    var args = {};
                    args.headers = headers;
                    var serviceBase = helper_service_1.HelperService.getServiceBase();
                    this.http
                        .post(serviceBase + 'token', usernamePlusPassword, args)
                        .subscribe(function (response) { return _this.storeToken(response, username); }, this.logError, function () { return console.log('Authentication Complete'); });
                };
                LoginService = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router, Function])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.service.js.map