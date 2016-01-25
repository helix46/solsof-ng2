System.register(['angular2/core', '../../services/helper/helper.service', '../../services/changePassword/changePassword.service', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, helper_service_1, changePassword_service_1, router_1;
    var ChangePasswordComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (changePassword_service_1_1) {
                changePassword_service_1 = changePassword_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            //import 'rxjs/Rx'; //for map
            ChangePasswordComponent = (function () {
                function ChangePasswordComponent(changePasswordService, router) {
                    this.changePasswordService = changePasswordService;
                    this.router = router;
                    this.submitted = false;
                    this.success = false;
                    this.changePasswordError = false;
                    this.userId = helper_service_1.HelperService.getInstance().getUsername();
                    console.log('constructor ChangePasswordComponent');
                    this.success = false;
                    this.changePasswordError = false;
                }
                ChangePasswordComponent.prototype.ngOnInit = function () {
                    if (helper_service_1.HelperService.getInstance().tokenIsValid() === false) {
                        this.router.navigate(['Login', 'Entities']);
                    }
                };
                ChangePasswordComponent.prototype.passwordsEqual = function () {
                    return this.newPassword === this.repeatNewPassword;
                };
                ChangePasswordComponent.prototype.logError = function (resp) {
                    console.log(resp.text());
                    //alert is temporary until browser is made aware that this.error has changed and error message is displayed
                    alert(resp.text());
                    this.changePasswordError = true;
                };
                ChangePasswordComponent.prototype.complete = function () {
                    console.log('changePassword complete');
                    alert('changePassword success');
                    //this.router.navigate(['Entities']);
                    this.success = true;
                };
                ChangePasswordComponent.prototype.onSubmit = function () {
                    if (this.newPassword === this.repeatNewPassword) {
                        this.submitted = true;
                        var changePasswordModel = {
                            userName: helper_service_1.HelperService.getInstance().getUsername(),
                            currentPassword: this.oldPassword,
                            newPassword: this.newPassword
                        };
                        if (helper_service_1.HelperService.getInstance().tokenIsValid()) {
                            this.changePasswordService.changePassword(changePasswordModel).subscribe(function (resp) { return alert('resp'); }, this.logError, this.complete);
                        }
                        else {
                            this.router.navigate(['Login']);
                        }
                    }
                    else {
                        alert('Passwords are not the same');
                    }
                };
                ChangePasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'changePassword',
                        templateUrl: 'src/app/components/changePassword/changePassword.component.html',
                        providers: [changePassword_service_1.ChangePasswordService]
                    }), 
                    __metadata('design:paramtypes', [changePassword_service_1.ChangePasswordService, router_1.Router])
                ], ChangePasswordComponent);
                return ChangePasswordComponent;
            })();
            exports_1("ChangePasswordComponent", ChangePasswordComponent);
        }
    }
});
//# sourceMappingURL=changePassword.component.js.map