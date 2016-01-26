System.register(['angular2/core', 'angular2/router', '../login/login.component', '../../components/entities/entities.component', '../../components/LedgerAccounts/ledgerAccounts.component', '../../components/transactions/transactions.component', '../../components/changePassword/changePassword.component', '../../components/logout/logout.component', '../../services/helper/helper.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, login_component_1, entities_component_1, ledgerAccounts_component_1, transactions_component_1, changePassword_component_1, logout_component_1, helper_service_1;
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
            function (transactions_component_1_1) {
                transactions_component_1 = transactions_component_1_1;
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
                    this.navbarWithoutJquery();
                };
                AppComponent.prototype.navbarWithoutJquery = function () {
                    // Navbar and dropdowns
                    var toggle = document.getElementsByClassName('navbar-toggle')[0], collapse = document.getElementsByClassName('navbar-collapse')[0], dropdowns = document.getElementsByClassName('dropdown');
                    ;
                    // Toggle if navbar menu is open or closed
                    function toggleMenu() {
                        collapse.classList.toggle('collapse');
                        collapse.classList.toggle('in');
                    }
                    // Close all dropdown menus
                    function closeMenus() {
                        for (var j = 0; j < dropdowns.length; j++) {
                            dropdowns[j].getElementsByClassName('dropdown-toggle')[0].classList.remove('dropdown-open');
                            dropdowns[j].classList.remove('open');
                        }
                    }
                    // Add click handling to dropdowns
                    for (var i = 0; i < dropdowns.length; i++) {
                        dropdowns[i].addEventListener('click', function () {
                            if (document.body.clientWidth < this.deviceCutoffWidth) {
                                var open = this.classList.contains('open');
                                closeMenus();
                                if (!open) {
                                    this.getElementsByClassName('dropdown-toggle')[0].classList.toggle('dropdown-open');
                                    this.classList.toggle('open');
                                }
                            }
                        });
                    }
                    // Close dropdowns when screen becomes big enough to switch to open by hover
                    function closeMenusOnResize() {
                        if (document.body.clientWidth >= this.deviceCutoffWidth) {
                            closeMenus();
                            collapse.classList.add('collapse');
                            collapse.classList.remove('in');
                        }
                    }
                    // Event listeners
                    window.addEventListener('resize', closeMenusOnResize, false);
                    toggle.addEventListener('click', toggleMenu, false);
                };
                AppComponent.deviceCutoffWidth = 768;
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
                        { path: '/transactions', name: 'Transactions', component: transactions_component_1.TransactionsComponent },
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