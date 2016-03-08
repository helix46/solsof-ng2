System.register(['../../services/GetEntity/GetEntity.service', 'angular2/router', '../../services/helper/helper.service', 'angular2/core', '../../services/Transactions/Transactions.service', '../Transaction/Transaction.component', '../../services/LedgerAccounts/LedgerAccounts.service', '../../services/bankAccounts/bankAccounts.service'], function(exports_1, context_1) {
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
    var GetEntity_service_1, router_1, helper_service_1, core_1, Transactions_service_1, Transaction_component_1, LedgerAccounts_service_1, bankAccounts_service_1;
    var TransactionsComponent;
    return {
        setters:[
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Transactions_service_1_1) {
                Transactions_service_1 = Transactions_service_1_1;
            },
            function (Transaction_component_1_1) {
                Transaction_component_1 = Transaction_component_1_1;
            },
            function (LedgerAccounts_service_1_1) {
                LedgerAccounts_service_1 = LedgerAccounts_service_1_1;
            },
            function (bankAccounts_service_1_1) {
                bankAccounts_service_1 = bankAccounts_service_1_1;
            }],
        execute: function() {
            TransactionsComponent = (function () {
                function TransactionsComponent(TransactionsService, router, routeParams, ledgerAccountsService, bankAccountsService) {
                    var _this = this;
                    this.TransactionsService = TransactionsService;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.ledgerAccountsService = ledgerAccountsService;
                    this.bankAccountsService = bankAccountsService;
                    this.Transactions = [];
                    this.getTransactionsError = false;
                    this.onLoadBankAccountsError = function () {
                        console.log('onLoadBankAccountsError');
                    };
                    this.onLoadLedgerAccountsError = function () {
                        console.log('onLoadLedgerAccountsError ');
                    };
                    this.onLoadLedgerAccountsSuccess = function (ledgerAccounts) {
                        _this.ledgerAccounts = ledgerAccounts;
                    };
                    this.onLoadBankAccountsSuccess = function (structLoadTransactionForm) {
                        _this.bankAccounts = structLoadTransactionForm.bankAccounts;
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
                    this.onRowDoubleClicked = function (params) {
                        var selectedTransaction = params.data;
                        _this.transactionComponent.getTransaction(selectedTransaction.transactionID, _this.ledgerAccounts, _this.bankAccounts);
                        _this.editTransaction = true;
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor TransactionsComponent');
                    this.listDateDescending = true;
                    window.onresize = function () {
                        //this.gridOptions.api.sizeColumnsToFit();
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
                        console.log('getTransactions Error');
                    }
                    function complete() {
                        console.log('getTransactions complete');
                    }
                    function onGetTransactionsSuccess(data) {
                        loadTransactionsThis.Transactions = data;
                        loadTransactionsThis.gridOptions.api.setRowData(data);
                        loadTransactionsThis.gridOptions.api.sizeColumnsToFit();
                        loadTransactionsThis.getTransactionsError = false;
                    }
                };
                ;
                TransactionsComponent.prototype.onRowClicked = function (params) {
                    //do nothing
                };
                __decorate([
                    core_1.ViewChild(Transaction_component_1.TransactionComponent), 
                    __metadata('design:type', Transaction_component_1.TransactionComponent)
                ], TransactionsComponent.prototype, "transactionComponent", void 0);
                TransactionsComponent = __decorate([
                    core_1.Component({
                        selector: 'transaction',
                        templateUrl: 'src/app/components/transactions/transactions.component.html',
                        pipes: [],
                        providers: [Transactions_service_1.TransactionsService, LedgerAccounts_service_1.LedgerAccountsService, bankAccounts_service_1.BankAccountsService],
                        directives: [window.ag.grid.AgGridNg2, Transaction_component_1.TransactionComponent]
                    }), 
                    __metadata('design:paramtypes', [Transactions_service_1.TransactionsService, router_1.Router, router_1.RouteParams, LedgerAccounts_service_1.LedgerAccountsService, bankAccounts_service_1.BankAccountsService])
                ], TransactionsComponent);
                return TransactionsComponent;
            }());
            exports_1("TransactionsComponent", TransactionsComponent);
        }
    }
});
//# sourceMappingURL=transactions.component.js.map