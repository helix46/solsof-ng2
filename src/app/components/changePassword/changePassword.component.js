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
                    var _this = this;
                    this.changePasswordService = changePasswordService;
                    this.router = router;
                    this.passwordsEqual = function () {
                        return _this.newPassword === _this.repeatNewPassword;
                    };
                    this.onSubmit = function () {
                        var onSubmitThis = _this;
                        if (_this.newPassword === _this.repeatNewPassword) {
                            var changePasswordModel = {
                                userName: helper_service_1.HelperService.getUsername(),
                                currentPassword: _this.oldPassword,
                                newPassword: _this.newPassword
                            };
                            if (helper_service_1.HelperService.tokenIsValid()) {
                                _this.changePasswordService.changePassword(changePasswordModel).subscribe(onSuccess, logError, complete);
                            }
                            else {
                                _this.router.navigate(['Login']);
                            }
                        }
                        else {
                            alert('Passwords are not the same');
                        }
                        function logError(resp) {
                            alert('Password may be changed even though an error has been thrown');
                            console.log('changePassword error');
                            onSubmitThis.getChangePasswordSuccess = false;
                        }
                        function complete() {
                            var _this = this;
                            console.log('changePassword complete');
                            setTimeout(function () { return _this.router.navigate(['Entities']); }, 2000);
                        }
                        function onSuccess() {
                            console.log('changePassword success');
                            onSubmitThis.getChangePasswordSuccess = true;
                        }
                    };
                    this.userId = helper_service_1.HelperService.getUsername();
                    console.log('constructor ChangePasswordComponent');
                    this.getChangePasswordSuccess = true;
                }
                ChangePasswordComponent.prototype.ngOnInit = function () {
                    if (helper_service_1.HelperService.tokenIsValid() === false) {
                        this.router.navigate(['Login', 'Entities']);
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