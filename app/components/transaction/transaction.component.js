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
var transaction_service_1 = require('../../services/transaction/transaction.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var GetEntity_service_1 = require('../../services/GetEntity/GetEntity.service');
var transactionline_component_1 = require('../transactionline/transactionline.component');
var main_1 = require('ag-grid-ng2/main');
var TransactionComponent = (function () {
    function TransactionComponent(transactionService, router) {
        var _this = this;
        this.transactionService = transactionService;
        this.router = router;
        this.getTransactionSuccess = true;
        this.ok = new core_1.EventEmitter();
        this.transaction = {
            comment: '',
            debtorID: -1,
            entityID: -1,
            transactionID: -1,
            transactionLineArray: [],
            bankAccountID: -1,
            chequeNumber: -1,
            sTransactionDate: '',
            transactionType: 0
        };
        this.transactionVisible = false;
        this.calculateTransactionTotal = function () {
            var i;
            var total = 0;
            for (i = 0; i < _this.transaction.transactionLineArray.length; i = i + 1) {
                if (_this.transaction.transactionLineArray[i].debit) {
                    total += _this.transaction.transactionLineArray[i].amount;
                }
                else {
                    total -= _this.transaction.transactionLineArray[i].amount;
                }
            }
            _this.transactionTotal = helper_service_1.HelperService.formatMoney(total);
        };
        this.newTransaction = function (ledgerAccounts, transactionType, bankAccounts) {
            _this.selectedTransactionLineIndex = -1;
            var newTransactionThis = _this;
            if (helper_service_1.HelperService.tokenIsValid()) {
                _this.ledgerAccounts = ledgerAccounts;
                _this.bankAccounts = bankAccounts;
                switch (transactionType) {
                    case 0:
                        _this.titleTransaction = 'Add Cheque';
                        _this.bankAccountDisabled = false;
                        break;
                    case 1:
                        _this.titleTransaction = 'Add Deposit';
                        _this.bankAccountDisabled = false;
                        break;
                    case 4:
                        _this.titleTransaction = 'Add General Journal';
                        _this.bankAccountDisabled = true;
                        break;
                }
                var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                if (EntityId === -1) {
                    _this.router.navigate(['Entities']);
                }
                else {
                    _this.transaction = {
                        comment: '',
                        debtorID: -1,
                        entityID: EntityId,
                        transactionID: -1,
                        transactionLineArray: [],
                        bankAccountID: -1,
                        chequeNumber: -1,
                        sTransactionDate: helper_service_1.HelperService.formatDateForJSon(new Date()),
                        transactionType: transactionType
                    };
                    _this.gridOptions.api.setRowData(_this.transaction.transactionLineArray);
                    _this.selectedTransactionLineIndex = -1;
                }
                _this.editTransaction = false;
                _this.getTransactionSuccess = true;
                _this.calculateTransactionTotal();
                _this.transactionVisible = true;
            }
            else {
                _this.router.navigate(['Login']);
            }
        };
        this.getTransaction = function (transactionID, ledgerAccounts, bankAccounts, copyTransaction) {
            var getTransactionThis = _this;
            getTransactionThis.editTransaction = !copyTransaction;
            if (helper_service_1.HelperService.tokenIsValid()) {
                _this.ledgerAccounts = ledgerAccounts;
                _this.bankAccounts = bankAccounts;
                var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                _this.transactionService.getTransaction(transactionID, EntityId).subscribe(onGetTransaction, logTransactionError);
            }
            else {
                _this.router.navigate(['Login']);
            }
            function onGetTransaction(transaction) {
                getTransactionThis.transaction = transaction;
                getTransactionThis.gridOptions.api.setRowData(transaction.transactionLineArray);
                getTransactionThis.gridOptions.api.sizeColumnsToFit();
                this.selectedTransactionLineIndex = -1;
                getTransactionThis.getTransactionSuccess = true;
                getTransactionThis.calculateTransactionTotal();
                getTransactionThis.transactionVisible = true;
                var verb;
                if (copyTransaction) {
                    verb = 'Copy ';
                }
                else {
                    verb = 'Edit ';
                }
                switch (transaction.transactionType) {
                    case 0:
                        getTransactionThis.titleTransaction = verb + 'Cheque';
                        getTransactionThis.bankAccountDisabled = false;
                        break;
                    case 1:
                        getTransactionThis.titleTransaction = verb + ' Deposit';
                        getTransactionThis.bankAccountDisabled = false;
                        break;
                    case 4:
                        getTransactionThis.titleTransaction = verb + ' General Journal';
                        getTransactionThis.bankAccountDisabled = true;
                        break;
                    case 5:
                        getTransactionThis.titleTransaction = verb + ' Invoice';
                        getTransactionThis.bankAccountDisabled = true;
                        break;
                    case 6:
                        getTransactionThis.titleTransaction = verb + ' Pay Invoice';
                        getTransactionThis.bankAccountDisabled = true;
                        break;
                }
            }
            function logTransactionError() {
                console.log('getTransaction Error');
                getTransactionThis.getTransactionSuccess = false;
            }
        };
        this.cancelTransaction = function () {
            _this.transactionVisible = false;
        };
        this.okClicked = function () {
            var okClickedThis = _this;
            if (_this.editTransaction) {
                if (helper_service_1.HelperService.tokenIsValid()) {
                    _this.transactionService.updateTransaction(_this.transaction).subscribe(updateTransactionSuccess, logError, complete);
                    _this.transactionVisible = false;
                }
                else {
                    _this.router.navigate(['Login']);
                }
            }
            else {
                if (helper_service_1.HelperService.tokenIsValid()) {
                    _this.transactionService.saveNewTransaction(_this.transaction).subscribe(updateTransactionSuccess, logError, complete);
                }
                else {
                    _this.router.navigate(['Login']);
                }
            }
            function logError(obj) {
                console.log(obj);
                console.log(JSON.stringify(obj));
            }
            function complete() {
                console.log('transaction complete');
            }
            function updateTransactionSuccess(response) {
                console.log('updateTransactionSuccess');
                okClickedThis.transactionVisible = false;
                okClickedThis.ok.emit('');
            }
        };
        this.selectedTransactionLineIndex = -1;
        this.deleteTransactionLine = function () {
            if (_this.selectedTransactionLineIndex === -1) {
                alert('Please choose a line to delete');
            }
            else {
                _this.transaction.transactionLineArray.splice(_this.selectedTransactionLineIndex, 1);
                _this.gridOptions.api.setRowData(_this.transaction.transactionLineArray);
                _this.selectedTransactionLineIndex = -1;
            }
        };
        this.saveTransactionLine = function (savededTransactionLine) {
            if (_this.bEditTransactionLine) {
                _this.transaction.transactionLineArray[_this.selectedTransactionLineIndex] = savededTransactionLine;
            }
            else {
                _this.transaction.transactionLineArray.push(savededTransactionLine);
            }
            ;
            _this.gridOptions.api.setRowData(_this.transaction.transactionLineArray);
            _this.selectedTransactionLineIndex = -1;
            _this.calculateTransactionTotal();
        };
        this.newTransactionLine = function () {
            _this.bEditTransactionLine = false;
            _this.transactionLineComponent.newTransactionLine(_this.ledgerAccounts, _this.transaction.transactionType);
        };
        this.columnDefs = [
            { headerName: 'Ledger Account', field: 'ledgerAccountName' },
            { headerName: 'Amount', field: 'amount', cellClass: 'rightJustify', cellRenderer: function (params) { return helper_service_1.HelperService.formatMoney(Number(params.value)); } },
            { headerName: 'Debit', field: 'debit' },
            { headerName: 'Comment', field: 'comment' }
        ];
        this.onRowClicked = function (params) {
            _this.selectedTransactionLineIndex = params.node.id;
        };
        this.onRowDoubleClicked = function (params) {
            var selectedTransactionLine = params.data;
            _this.bEditTransactionLine = true;
            _this.transactionLineComponent.displayTransactionline(selectedTransactionLine, _this.ledgerAccounts, _this.transaction.transactionType);
        };
        this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
        console.log('constructor transactionComponent');
    }
    TransactionComponent.prototype.ngOnInit = function () {
        if (helper_service_1.HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TransactionComponent.prototype, "ok", void 0);
    __decorate([
        core_1.ViewChild(transactionline_component_1.TransactionLineComponent), 
        __metadata('design:type', transactionline_component_1.TransactionLineComponent)
    ], TransactionComponent.prototype, "transactionLineComponent", void 0);
    TransactionComponent = __decorate([
        core_1.Component({
            selector: 'transactionModal',
            templateUrl: 'src/app/components/transaction/transaction.component.html',
            styles: ['.modalSolsofVisible {display: block;}'],
            providers: [transaction_service_1.TransactionService],
            directives: [main_1.AgGridNg2, transactionline_component_1.TransactionLineComponent]
        }), 
        __metadata('design:paramtypes', [transaction_service_1.TransactionService, router_deprecated_1.Router])
    ], TransactionComponent);
    return TransactionComponent;
}());
exports.TransactionComponent = TransactionComponent;
//# sourceMappingURL=Transaction.component.js.map