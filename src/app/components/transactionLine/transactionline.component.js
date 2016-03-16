System.register(['angular2/core', '../../services/helper/helper.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, helper_service_1;
    var TransactionLineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            }],
        execute: function() {
            TransactionLineComponent = (function () {
                function TransactionLineComponent() {
                    var _this = this;
                    this.saver = new core_1.EventEmitter();
                    this.displayTransactionline = function (selectedTransactionLine, ledgerAccounts, transactionType) {
                        _this.transactionType = transactionType;
                        _this.configureTransactionType(transactionType);
                        _this.titleTransactionLine = 'Edit Transaction Line';
                        _this.amount = selectedTransactionLine.amount;
                        _this.comment = selectedTransactionLine.comment;
                        _this.debit = selectedTransactionLine.debit;
                        _this.sLedgerAccountID = selectedTransactionLine.ledgerAccountID.toString();
                        _this.transactionLineVisible = true;
                        _this.ledgerAccounts = ledgerAccounts;
                    };
                    this.configureTransactionType = function (transactionType) {
                        switch (transactionType) {
                            case 0 /* Cheque */:
                                _this.debit = true;
                                _this.debitCreditDisabled = true;
                                break;
                            case 1 /* Deposit */:
                                _this.debit = false;
                                _this.debitCreditDisabled = true;
                                break;
                            case 4 /* GeneralJournal */:
                                _this.debit = true;
                                _this.debitCreditDisabled = false;
                                break;
                        }
                    };
                    this.newTransactionLine = function (ledgerAccounts, transactionType) {
                        _this.transactionType = transactionType;
                        _this.configureTransactionType(transactionType);
                        _this.titleTransactionLine = 'Add Transaction Line';
                        _this.amount = 0;
                        _this.comment = '';
                        _this.sLedgerAccountID = '';
                        _this.transactionLineVisible = true;
                        _this.ledgerAccounts = ledgerAccounts;
                    };
                    this.cancelTransactionLine = function () {
                        _this.transactionLineVisible = false;
                    };
                    this.saveTransactionLine = function () {
                        var saveTransactionLineThis = _this;
                        var ledgerAccountID = Number(saveTransactionLineThis.sLedgerAccountID);
                        var transactionLine = {
                            amount: saveTransactionLineThis.amount,
                            comment: saveTransactionLineThis.comment,
                            debit: saveTransactionLineThis.debit,
                            debitOrCredit: '',
                            hidden: false,
                            invoiceID: -1,
                            ledgerAccountID: ledgerAccountID,
                            ledgerAccountName: helper_service_1.HelperService.getLedgerAccountName(ledgerAccountID, saveTransactionLineThis.ledgerAccounts),
                            timesheetID: -1
                        };
                        _this.saver.emit(transactionLine);
                        _this.transactionLineVisible = false;
                    };
                    console.log('constructor TransactionLineComponent');
                }
                TransactionLineComponent.prototype.ngOnInit = function () {
                };
                TransactionLineComponent.prototype.modalOnKeyup = function () {
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TransactionLineComponent.prototype, "saver", void 0);
                TransactionLineComponent = __decorate([
                    core_1.Component({
                        selector: 'transaction-line',
                        templateUrl: 'src/app/components/transactionLine/transactionLine.component.html',
                        styles: ['.modalSolsofVisible {display: block;}']
                    }), 
                    __metadata('design:paramtypes', [])
                ], TransactionLineComponent);
                return TransactionLineComponent;
            }());
            exports_1("TransactionLineComponent", TransactionLineComponent);
        }
    }
});
//# sourceMappingURL=transactionline.component.js.map