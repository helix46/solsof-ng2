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
var DialogBoxComponent = (function () {
    function DialogBoxComponent() {
        var _this = this;
        this.OK = new core_1.EventEmitter();
        this.message = '';
        this.cancelLabel = 'Cancel';
        this.okLabel = 'Ok';
        this.dialogBoxVisible = false;
        this.enumModalType = 0;
        this.cancelVisible = true;
        this.cancel = function () {
            _this.dialogBoxVisible = false;
        };
        this.displayDialogBox = function (message, fnConfirmed) {
            _this.enumModalType = 0;
            _this.message = message;
            _this.fnConfirmed = fnConfirmed;
            _this.dialogBoxVisible = true;
            _this.cancelVisible = true;
        };
        this.alert = function (message) {
            _this.enumModalType = 1;
            _this.message = message;
            _this.dialogBoxVisible = true;
            _this.cancelVisible = false;
        };
        console.log('constructor DialogBoxComponent');
    }
    DialogBoxComponent.prototype.ngOnInit = function () {
    };
    DialogBoxComponent.prototype.ok = function () {
        this.dialogBoxVisible = false;
        if (this.enumModalType === 0) {
            this.fnConfirmed();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DialogBoxComponent.prototype, "OK", void 0);
    DialogBoxComponent = __decorate([
        core_1.Component({
            selector: 'dialog-box',
            templateUrl: 'src/app/components/utilities/dialogBox/dialogBox.component.html',
            styles: ['.modalSolsofVisible {display: block;}', '.modalCancelHidden {display: none;}']
        }), 
        __metadata('design:paramtypes', [])
    ], DialogBoxComponent);
    return DialogBoxComponent;
}());
exports.DialogBoxComponent = DialogBoxComponent;
//# sourceMappingURL=dialogBox.component.js.map