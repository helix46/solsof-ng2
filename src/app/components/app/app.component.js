System.register(['angular2/core', 'angular2/router', '../login/login.component', '../../components/entities/entities.component', '../../components/LedgerAccounts/ledgerAccounts.component', '../../components/changePassword/changePassword.component', '../../components/logout/logout.component', '../../services/helper/helper.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, login_component_1, entities_component_1, ledgerAccounts_component_1, changePassword_component_1, logout_component_1, helper_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (entities_component_1_1) {
                entities_component_1 = entities_component_1_1;
            },
            function (ledgerAccounts_component_1_1) {
                ledgerAccounts_component_1 = ledgerAccounts_component_1_1;
            },
            function (changePassword_component_1_1) {
                changePassword_component_1 = changePassword_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Solid Software';
                    this.tokenValid = helper_service_1.HelperService.getInstance().tokenIsValid();
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.tokenValid = helper_service_1.HelperService.getInstance().tokenIsValid();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'src/app/components/app/app.component.html',
                        styleUrls: ['src/app/components/app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', redirectTo: ['Entities'] },
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/entities', name: 'Entities', component: entities_component_1.EntitiesComponent, useAsDefault: true },
                        { path: '/ledgerAccounts', name: 'LedgerAccounts', component: ledgerAccounts_component_1.LedgerAccountsComponent },
                        { path: '/changePassword', name: 'ChangePassword', component: changePassword_component_1.ChangePasswordComponent },
                        { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map