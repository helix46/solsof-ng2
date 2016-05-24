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
//import {NgForm, ControlGroup, Validators, FORM_BINDINGS, FormBuilder, FORM_DIRECTIVES} from '@angular/common';
var router_deprecated_1 = require('@angular/router-deprecated');
var login_service_1 = require('../../services/login/login.service');
var http_1 = require('@angular/http');
var helper_service_1 = require('../../services/helper/helper.service');
var LoginComponent = (function () {
    function LoginComponent(router, http) {
        this.router = router;
        this.http = http;
        this.loginService = new login_service_1.LoginService(this.http, this.router, this.loginfinished);
        helper_service_1.HelperService.logError('constructor LoginComponent');
        if (helper_service_1.HelperService.tokenIsValid()) {
            router.navigate(['Entities']);
        }
    }
    LoginComponent.prototype.loginfinished = function () {
        this.router.navigate(['Entities', {}]);
    };
    LoginComponent.prototype.login = function () {
        this.loginService.authenticate(this.username, this.password);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            directives: [router_deprecated_1.RouterLink],
            templateUrl: 'app/components/login/login.component.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map