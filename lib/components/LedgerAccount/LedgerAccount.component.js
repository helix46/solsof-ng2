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
var ledgerAccount_service_1 = require('../../services/ledgerAccount/ledgerAccount.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var GetEntity_service_1 = require('../../services/GetEntity/GetEntity.service');
var LedgerAccountComponent = (function () {
    function LedgerAccountComponent(ledgerAccountService, router) {
        var _this = this;
        this.ledgerAccountService = ledgerAccountService;
        this.router = router;
        this.getLedgerAccountSuccess = true;
        this.ok = new core_1.EventEmitter();
        this.ledgerAccount = {
            ledgerAccountID: -1,
            name: '',
            active: true,
            ledgerAccountType: 1 /* Asset */,
            entityID: -1
        };
        this.ledgerAccountVisible = false;
        this.newLedgerAccount = function () {
            var newLedgerAccountThis = _this;
            newLedgerAccountThis.editLedgerAccount = false;
            if (helper_service_1.HelperService.tokenIsValid()) {
                newLedgerAccountThis.titleLedgerAccount = 'Add Ledger Account';
                var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                if (EntityId === -1) {
                    newLedgerAccountThis.router.navigate(['Entities']);
                }
                newLedgerAccountThis.getLedgerAccountSuccess = true;
                newLedgerAccountThis.ledgerAccountVisible = true;
            }
            else {
                newLedgerAccountThis.router.navigate(['Login']);
            }
            helper_service_1.HelperService.log('newLedgerAccount');
        };
        this.getLedgerAccount = function (ledgerAccountID) {
            var getLedgerAccountThis = _this;
            if (helper_service_1.HelperService.tokenIsValid()) {
                var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                getLedgerAccountThis.titleLedgerAccount = 'Edit LedgerAccount';
                getLedgerAccountThis.ledgerAccountService.getLedgerAccount(ledgerAccountID, EntityId).subscribe(onGetLedgerAccount, logLedgerAccountError);
            }
            else {
                getLedgerAccountThis.router.navigate(['Login']);
            }
            function onGetLedgerAccount(ledgerAccount) {
                getLedgerAccountThis.editLedgerAccount = true;
                getLedgerAccountThis.ledgerAccount = ledgerAccount;
                getLedgerAccountThis.getLedgerAccountSuccess = true;
                getLedgerAccountThis.ledgerAccountVisible = true;
                document.onkeydown = getLedgerAccountThis.keydown;
            }
            function logLedgerAccountError() {
                helper_service_1.HelperService.log('getLedgerAccount Error');
                getLedgerAccountThis.getLedgerAccountSuccess = false;
            }
        };
        this.keydown = function (event) {
            if (event.keyCode === 27) {
                _this.cancelLedgerAccount();
            }
        };
        this.cancelLedgerAccount = function () {
            _this.ledgerAccountVisible = false;
            document.onkeydown = null;
        };
        this.okClicked = function () {
            var okClickedThis = _this;
            if (_this.editLedgerAccount) {
                if (helper_service_1.HelperService.tokenIsValid()) {
                    _this.ledgerAccountService.updateLedgerAccount(_this.ledgerAccount).subscribe(updateLedgerAccountSuccess, logError, complete);
                    _this.ledgerAccountVisible = false;
                }
                else {
                    _this.router.navigate(['Login']);
                }
            }
            else {
                if (helper_service_1.HelperService.tokenIsValid()) {
                    _this.ledgerAccount.entityID = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                    _this.ledgerAccountService.saveNewLedgerAccount(_this.ledgerAccount).subscribe(updateLedgerAccountSuccess, logError, complete);
                    _this.ledgerAccountVisible = false;
                }
                else {
                    _this.router.navigate(['Login']);
                }
            }
            function logError(obj) {
                helper_service_1.HelperService.log(JSON.stringify(obj));
                alert(JSON.stringify(obj));
            }
            function complete() {
                helper_service_1.HelperService.log('ledgerAccount complete');
            }
            function updateLedgerAccountSuccess() {
                okClickedThis.ok.emit('');
            }
        };
        helper_service_1.HelperService.log('constructor LedgerAccountComponent');
    }
    LedgerAccountComponent.prototype.ngOnInit = function () {
        if (helper_service_1.HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
        this.ledgerAccountTypes = helper_service_1.HelperService.loadLedgerAccountTypes();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LedgerAccountComponent.prototype, "ok", void 0);
    LedgerAccountComponent = __decorate([
        core_1.Component({
            selector: 'ledgerAccountModal',
            templateUrl: 'app/components/ledgerAccount/ledgerAccount.component.html',
            styles: ['.modalSolsofVisible {display: block;}'],
            //styleUrls: ['app/components/ledgerAccount/ledgerAccount.css'],
            providers: [ledgerAccount_service_1.LedgerAccountService]
        }), 
        __metadata('design:paramtypes', [ledgerAccount_service_1.LedgerAccountService, router_deprecated_1.Router])
    ], LedgerAccountComponent);
    return LedgerAccountComponent;
}());
exports.LedgerAccountComponent = LedgerAccountComponent;
//# sourceMappingURL=LedgerAccount.component.js.map