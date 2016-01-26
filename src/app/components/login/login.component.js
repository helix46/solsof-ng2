System.register(['angular2/core', 'angular2/router', '../../services/login/login.service', 'angular2/http', '../../services/helper/helper.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, login_service_1, http_1, helper_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(router, http) {
                    this.router = router;
                    this.http = http;
                    this.loginService = new login_service_1.LoginService(this.http, this.router, this.loginfinished);
                    console.log('constructor LoginComponent');
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
                        selector: 'login'
                    }),
                    core_1.View({
                        templateUrl: 'src/app/components/login/login.component.html',
                        directives: [router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map