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
var main_1 = require('ag-grid-ng2/main');
var GetEntity_service_1 = require('../../services/GetEntity/GetEntity.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var helper_service_1 = require('../../services/helper/helper.service');
var core_1 = require('@angular/core');
var Transactions_service_1 = require('../../services/Transactions/Transactions.service');
var transaction_service_1 = require('../../services/transaction/transaction.service');
var Transaction_component_1 = require('../Transaction/Transaction.component');
var LedgerAccounts_service_1 = require('../../services/LedgerAccounts/LedgerAccounts.service');
var bankAccounts_service_1 = require('../../services/bankAccounts/bankAccounts.service');
var dialogBox_component_1 = require('../utilities/dialogBox/dialogBox.component');
var TransactionsComponent = (function () {
    function TransactionsComponent(TransactionsService, router, routeParams, ledgerAccountsService, bankAccountsService, transactionService) {
        var _this = this;
        this.TransactionsService = TransactionsService;
        this.router = router;
        this.routeParams = routeParams;
        this.ledgerAccountsService = ledgerAccountsService;
        this.bankAccountsService = bankAccountsService;
        this.transactionService = transactionService;
        this.Transactions = [];
        this.getTransactionsError = false;
        this.onLoadBankAccountsError = function () {
            helper_service_1.HelperService.logError('onLoadBankAccountsError');
        };
        this.onLoadLedgerAccountsError = function () {
            helper_service_1.HelperService.logError('onLoadLedgerAccountsError ');
        };
        this.onLoadLedgerAccountsSuccess = function (ledgerAccounts) {
            _this.ledgerAccounts = ledgerAccounts;
            _this.transactionsTitle = 'Transactions - ' + helper_service_1.HelperService.getLedgerAccountName(_this.ledgerAccountID, _this.ledgerAccounts);
        };
        this.onLoadBankAccountsSuccess = function (structLoadTransactionForm) {
            _this.bankAccounts = structLoadTransactionForm.bankAccounts;
        };
        this.addCheque = function () {
            _this.transactionComponent.newTransaction(_this.ledgerAccounts, 0 /* Cheque */, _this.bankAccounts);
            _this.editTransaction = true;
        };
        this.addDeposit = function () {
            _this.transactionComponent.newTransaction(_this.ledgerAccounts, 1 /* Deposit */, _this.bankAccounts);
            _this.editTransaction = true;
        };
        this.addGeneralJournal = function () {
            _this.transactionComponent.newTransaction(_this.ledgerAccounts, 4 /* GeneralJournal */, _this.bankAccounts);
            _this.editTransaction = true;
        };
        this.copyTransaction = function () {
            if (_this.selectedTransaction === undefined) {
                alert('Please chooose a transaction to copy');
            }
            else {
                _this.transactionComponent.getTransaction(_this.selectedTransaction.transactionID, _this.ledgerAccounts, _this.bankAccounts, true);
                _this.editTransaction = false;
            }
        };
        this.deleteTransaction = function () {
            var deleteTransactionThis = _this;
            var selectedRows = deleteTransactionThis.gridOptions.api.getSelectedRows();
            if (selectedRows.length > 0) {
                _this.dialogBoxComponent.displayDialogBox('Are you sure you want to delete this Transaction?', deleteTransactionConfirmed);
            }
            else {
                _this.dialogBoxComponent.alert('Please select a Transaction to delete');
            }
            function deleteTransactionConfirmed() {
                if (helper_service_1.HelperService.tokenIsValid()) {
                    var obs = deleteTransactionThis.transactionService.deleteTransaction(selectedRows[0].transactionID);
                    obs.subscribe(onDeleteTransactionSuccess, function (err) { return logTransactionsError(err); }, complete);
                }
                else {
                    deleteTransactionThis.router.navigate(['Login']);
                }
                function onDeleteTransactionSuccess() {
                    deleteTransactionThis.loadTransactions();
                }
                function logTransactionsError(err) {
                    helper_service_1.HelperService.logError('deleteTransaction Error');
                }
                function complete() {
                    helper_service_1.HelperService.logError('loadTransactions complete');
                }
            }
        };
        /////////////////////////////////////////////////////////////
        //grid
        this.columnDefs = [
            { headerName: "transactionID", field: "transactionID", hide: true },
            {
                headerName: "Date",
                field: "transactionDate",
                cellRenderer: function (params) {
                    return helper_service_1.HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
                },
                cellClass: 'rightJustify',
            },
            { headerName: "Comment", field: "comment" },
            { headerName: "Type", field: "transactionType" },
            {
                headerName: "Amount",
                field: "amount",
                cellClass: 'rightJustify',
                cellRenderer: function (params) {
                    return helper_service_1.HelperService.noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
                minWidth: 80
            },
            {
                headerName: "Total",
                field: "total",
                cellClass: 'rightJustify',
                cellRenderer: function (params) {
                    return helper_service_1.HelperService.noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
                minWidth: 80
            }
        ];
        this.onRowClicked = function (params) {
            _this.selectedTransaction = params.data;
            //do nothing
        };
        this.onRowDoubleClicked = function (params) {
            var selectedTransaction = params.data;
            _this.transactionComponent.getTransaction(selectedTransaction.transactionID, _this.ledgerAccounts, _this.bankAccounts, false);
            _this.editTransaction = true;
        };
        this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
        helper_service_1.HelperService.logError('constructor TransactionsComponent');
        this.listDateDescending = true;
        window.onresize = function () {
            _this.gridOptions.api.sizeColumnsToFit();
        };
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        this.ledgerAccountID = Number(this.routeParams.get('ledgerAccountID'));
        this.loadTransactions();
        helper_service_1.HelperService.loadLedgerAccounts(this.router, this.ledgerAccountsService, this.onLoadLedgerAccountsError, this.onLoadLedgerAccountsSuccess);
        helper_service_1.HelperService.loadBankAccounts(this.router, this.bankAccountsService, this.onLoadBankAccountsError, this.onLoadBankAccountsSuccess);
    };
    TransactionsComponent.prototype.chkListDateDescendingClicked = function (chkListDateDescending) {
        this.listDateDescending = chkListDateDescending.checked;
        this.loadTransactions();
    };
    //////////////////////////////////////////////////////////////
    //get data
    TransactionsComponent.prototype.loadTransactions = function () {
        var loadTransactionsThis = this;
        //var TransactionsComponentThis = this;
        if (helper_service_1.HelperService.tokenIsValid()) {
            var entityID = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
            if (entityID === -1) {
                this.router.navigate(['Entities']);
            }
            else {
                this.TransactionsService.getTransactions(entityID, this.ledgerAccountID, this.listDateDescending).subscribe(onGetTransactionsSuccess, logError, complete);
            }
        }
        else {
            this.router.navigate(['Login']);
        }
        function logError(e) {
            helper_service_1.HelperService.logError('getTransactions Error');
        }
        function complete() {
            helper_service_1.HelperService.logError('getTransactions complete');
        }
        function onGetTransactionsSuccess(data) {
            loadTransactionsThis.Transactions = data;
            loadTransactionsThis.gridOptions.api.setRowData(data);
            loadTransactionsThis.gridOptions.api.sizeColumnsToFit();
            loadTransactionsThis.getTransactionsError = false;
        }
    };
    ;
    __decorate([
        core_1.ViewChild(Transaction_component_1.TransactionComponent), 
        __metadata('design:type', Transaction_component_1.TransactionComponent)
    ], TransactionsComponent.prototype, "transactionComponent", void 0);
    __decorate([
        core_1.ViewChild(dialogBox_component_1.DialogBoxComponent), 
        __metadata('design:type', dialogBox_component_1.DialogBoxComponent)
    ], TransactionsComponent.prototype, "dialogBoxComponent", void 0);
    TransactionsComponent = __decorate([
        core_1.Component({
            selector: 'transaction',
            templateUrl: 'app/components/transactions/transactions.component.html',
            pipes: [],
            providers: [Transactions_service_1.TransactionsService, LedgerAccounts_service_1.LedgerAccountsService, bankAccounts_service_1.BankAccountsService, transaction_service_1.TransactionService],
            //directives: [(<any>window).ag.grid.AgGridNg2, TransactionComponent, DialogBoxComponent]
            directives: [main_1.AgGridNg2, Transaction_component_1.TransactionComponent, dialogBox_component_1.DialogBoxComponent]
        }), 
        __metadata('design:paramtypes', [Transactions_service_1.TransactionsService, router_deprecated_1.Router, router_deprecated_1.RouteParams, LedgerAccounts_service_1.LedgerAccountsService, bankAccounts_service_1.BankAccountsService, transaction_service_1.TransactionService])
    ], TransactionsComponent);
    return TransactionsComponent;
}());
exports.TransactionsComponent = TransactionsComponent;
//# sourceMappingURL=transactions.component.js.map