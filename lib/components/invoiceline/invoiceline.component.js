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
var InvoiceLineComponent = (function () {
    function InvoiceLineComponent() {
        var _this = this;
        this.returnInvoiceLine = new core_1.EventEmitter();
        this.displayInvoiceline = function (selectedInvoiceLine, ledgerAccounts) {
            _this.ledgerAccounts = ledgerAccounts;
            _this.titleInvoiceLine = 'Edit Invoice Line';
            _this.sLledgerAccountID = selectedInvoiceLine.ledgerAccountID.toString();
            _this.amount = selectedInvoiceLine.amount;
            _this.comment = selectedInvoiceLine.comment;
            _this.invoiceLineVisible = true;
        };
        this.newInvoiceLine = function (ledgerAccounts) {
            _this.ledgerAccounts = ledgerAccounts;
            _this.clearInvoiceLine();
            _this.invoiceLineVisible = true;
        };
        this.clearInvoiceLine = function () {
            _this.titleInvoiceLine = 'Add Invoice Line';
            _this.sLledgerAccountID = '';
            _this.amount = 0;
            _this.comment = '';
        };
        this.cancelInvoiceLine = function () {
            _this.clearInvoiceLine();
            _this.invoiceLineVisible = false;
        };
        helper_service_1.HelperService.log('constructor InvoiceLineComponent');
    }
    InvoiceLineComponent.prototype.ngOnInit = function () {
        this.clearInvoiceLine();
    };
    InvoiceLineComponent.prototype.saveInvoiceLine = function () {
        var ledgerAccountID = Number(this.sLledgerAccountID);
        var selectedInvoiceLine = {
            ledgerAccountID: ledgerAccountID,
            ledgerAccountName: helper_service_1.HelperService.getLedgerAccountName(ledgerAccountID, this.ledgerAccounts),
            debitOrCredit: '',
            amount: this.amount,
            debit: false,
            comment: this.comment,
            hidden: false,
            timesheetID: -1,
            invoiceID: -1
        };
        this.returnInvoiceLine.emit(selectedInvoiceLine);
        this.invoiceLineVisible = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InvoiceLineComponent.prototype, "returnInvoiceLine", void 0);
    InvoiceLineComponent = __decorate([
        core_1.Component({
            selector: 'invoice-line',
            templateUrl: 'app/components/invoiceLine/invoiceLine.component.html',
            styles: ['.modalSolsofVisible {display: block;}']
        }), 
        __metadata('design:paramtypes', [])
    ], InvoiceLineComponent);
    return InvoiceLineComponent;
}());
exports.InvoiceLineComponent = InvoiceLineComponent;
//# sourceMappingURL=invoiceline.component.js.map