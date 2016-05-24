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
var helper_service_1 = require('../../services/helper/helper.service');
var changePassword_service_1 = require('../../services/changePassword/changePassword.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(changePasswordService, router) {
        var _this = this;
        this.changePasswordService = changePasswordService;
        this.router = router;
        this.bPasswordsEqual = true;
        this.passwordsEqual = function () {
            _this.bPasswordsEqual = _this.newPassword === _this.repeatNewPassword;
            return _this.bPasswordsEqual;
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
                HelperService.logError('changePassword error');
                onSubmitThis.getChangePasswordSuccess = false;
            }
            function complete() {
                var _this = this;
                HelperService.logError('changePassword complete');
                setTimeout(function () { return _this.router.navigate(['Entities']); }, 2000);
            }
            function onSuccess() {
                HelperService.logError('changePassword success');
                onSubmitThis.getChangePasswordSuccess = true;
            }
        };
        this.userId = helper_service_1.HelperService.getUsername();
        HelperService.logError('constructor ChangePasswordComponent');
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
        __metadata('design:paramtypes', [changePassword_service_1.ChangePasswordService, router_deprecated_1.Router])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=changePassword.component.js.map