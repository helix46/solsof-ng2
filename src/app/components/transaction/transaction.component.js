System.register(['angular2/core', '../../services/helper/helper.service', '../../services/transaction/transaction.service', 'angular2/router', '../../services/GetEntity/GetEntity.service', '../transactionline/transactionline.component'], function(exports_1, context_1) {
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
    var core_1, helper_service_1, transaction_service_1, router_1, GetEntity_service_1, transactionline_component_1;
    var TransactionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (transaction_service_1_1) {
                transaction_service_1 = transaction_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            },
            function (transactionline_component_1_1) {
                transactionline_component_1 = transactionline_component_1_1;
            }],
        execute: function() {
            //import {AgGridNg2} from 'ag-grid-ng2/main';
            //import {GridOptions} from 'ag-grid/main';
            TransactionComponent = (function () {
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
                        transactionType: 0 /* Cheque */
                    };
                    this.transactionVisible = false;
                    this.calculateTransactionTotal = function () {
                        var i;
                        var total = 0;
                        for (i = 0; i < _this.transaction.transactionLineArray.length; i = i + 1) {
                            total += _this.transaction.transactionLineArray[i].amount;
                        }
                        _this.transactionTotal = helper_service_1.HelperService.formatMoney(total);
                    };
                    this.newTransaction = function (ledgerAccounts, transactionType) {
                        var newTransactionThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            _this.ledgerAccounts = ledgerAccounts;
                            _this.titleTransaction = 'Add Transaction';
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.transaction = {
                                    comment: '',
                                    debtorID: -1,
                                    entityID: -1,
                                    transactionID: -1,
                                    transactionLineArray: [],
                                    bankAccountID: -1,
                                    chequeNumber: -1,
                                    sTransactionDate: '',
                                    transactionType: transactionType
                                };
                                _this.gridOptions.api.setRowData(_this.transaction.transactionLineArray);
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
                    this.getTransaction = function (transactionID, ledgerAccounts) {
                        var getTransactionThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            _this.ledgerAccounts = ledgerAccounts;
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            _this.titleTransaction = 'Edit Transaction';
                            _this.transactionService.getTransaction(transactionID, EntityId).subscribe(onGetTransaction, logTransactionError);
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                        function onGetTransaction(transaction) {
                            getTransactionThis.editTransaction = true;
                            getTransactionThis.transaction = transaction;
                            getTransactionThis.gridOptions.api.setRowData(transaction.transactionLineArray);
                            getTransactionThis.gridOptions.api.sizeColumnsToFit();
                            getTransactionThis.getTransactionSuccess = true;
                            getTransactionThis.calculateTransactionTotal();
                            getTransactionThis.transactionVisible = true;
                        }
                        function logTransactionError() {
                            console.log('getTransaction Error');
                            getTransactionThis.getTransactionSuccess = false;
                        }
                    };
                    //dropdowns are not currently updating model
                    //onChangeDebtor = (value: any) => {
                    //    var currentTarget: HTMLSelectElement = <HTMLSelectElement>event.currentTarget;
                    //    this.transaction.debtorID = Number(currentTarget.value);
                    //}
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
                            console.log(JSON.stringify(obj));
                            alert(JSON.stringify(obj));
                        }
                        function complete() {
                            console.log('transaction complete');
                        }
                        function updateTransactionSuccess(response) {
                            var transactionID = response.json();
                            okClickedThis.transactionVisible = false;
                            okClickedThis.ok.emit('');
                        }
                    };
                    this.deleteTransactionLine = function () {
                        _this.transaction.transactionLineArray.splice(_this.selectedTransactionLineIndex, 1);
                        _this.gridOptions.api.setRowData(_this.transaction.transactionLineArray);
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
                        _this.calculateTransactionTotal();
                    };
                    this.newTransactionLine = function () {
                        _this.bEditTransactionLine = false;
                        _this.transactionLineComponent.newTransactionLine(_this.ledgerAccounts);
                    };
                    ////////////////////////////////////
                    //grid
                    ////////////////////////////////////
                    this.columnDefs = [
                        {
                            headerName: 'Date', field: 'sTransactionLineDate', cellRenderer: function (params) {
                                var d = helper_service_1.HelperService.translateJavascriptDate(params.value);
                                return helper_service_1.HelperService.formatDateForDisplay(d, false, false, false);
                            }
                        },
                        { headerName: 'Ledger Account', field: 'ledgerAccountName' },
                        { headerName: 'Amount', field: 'amount', cellClass: 'rightJustify', cellRenderer: function (params) { return helper_service_1.HelperService.formatMoney(Number(params.value)); } },
                        { headerName: 'Comment', field: 'comment' }
                    ];
                    this.onRowClicked = function (params) {
                        //params.node.id seems to be index of data array (not row number!)
                        _this.selectedTransactionLineIndex = params.node.id;
                    };
                    this.onRowDoubleClicked = function (params) {
                        var selectedTransactionLine = params.data;
                        _this.bEditTransactionLine = true;
                        _this.transactionLineComponent.displayTransactionline(selectedTransactionLine, _this.ledgerAccounts);
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
                        directives: [window.ag.grid.AgGridNg2, transactionline_component_1.TransactionLineComponent]
                    }), 
                    __metadata('design:paramtypes', [transaction_service_1.TransactionService, router_1.Router])
                ], TransactionComponent);
                return TransactionComponent;
            }());
            exports_1("TransactionComponent", TransactionComponent);
        }
    }
});
//# sourceMappingURL=transaction.component.js.map