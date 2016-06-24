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
/// <reference path="../../solsof.d.ts" />
/// <reference path="../../../typings/es6-shim/es6-shim.d.ts" />
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var login_component_1 = require('../login/login.component');
//import {LoginComponent} from '../login/login.component';
var entities_component_1 = require('../../components/entities/entities.component');
var ledgerAccounts_component_1 = require('../../components/LedgerAccounts/ledgerAccounts.component');
var timesheet_component_1 = require('../../components/timesheet/timesheet.component');
var timesheets_component_1 = require('../../components/timesheets/timesheets.component');
var invoices_component_1 = require('../../components/invoices/invoices.component');
var transactions_component_1 = require('../../components/transactions/transactions.component');
var changePassword_component_1 = require('../../components/changePassword/changePassword.component');
var logout_component_1 = require('../../components/logout/logout.component');
var helper_service_1 = require('../../services/helper/helper.service');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Solid Software';
        this.tokenValid = helper_service_1.HelperService.tokenIsValid();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.tokenValid = helper_service_1.HelperService.tokenIsValid();
        //this.navbarWithoutJquery()
    };
    AppComponent.deviceCutoffWidth = 768;
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/components/app/app.component.html',
            styleUrls: ['app/components/app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [router_deprecated_1.ROUTER_PROVIDERS]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', redirectTo: ['Entities'] },
            { path: '/changePassword', name: 'ChangePassword', component: changePassword_component_1.ChangePasswordComponent },
            { path: '/entities', name: 'Entities', component: entities_component_1.EntitiesComponent, useAsDefault: true },
            { path: '/invoices', name: 'Invoices', component: invoices_component_1.InvoicesComponent },
            { path: '/ledgerAccounts', name: 'LedgerAccounts', component: ledgerAccounts_component_1.LedgerAccountsComponent },
            { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
            { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent },
            { path: '/timesheet', name: 'Timesheet', component: timesheet_component_1.TimesheetComponent },
            { path: '/timesheets', name: 'Timesheets', component: timesheets_component_1.TimesheetsComponent },
            { path: '/transactions', name: 'Transactions', component: transactions_component_1.TransactionsComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map