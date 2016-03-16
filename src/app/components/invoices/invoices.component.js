System.register(['angular2/router', '../../services/helper/helper.service', '../../services/GetEntity/GetEntity.service', 'angular2/core', '../../services/Invoices/Invoices.service', '../invoice/invoice.component', '../../services/ledgeraccounts/ledgeraccounts.service', '../../services/debtors/debtors.service', 'ag-grid-ng2/main'], function(exports_1, context_1) {
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
    var router_1, helper_service_1, GetEntity_service_1, core_1, Invoices_service_1, invoice_component_1, ledgeraccounts_service_1, debtors_service_1, main_1;
    var InvoicesComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Invoices_service_1_1) {
                Invoices_service_1 = Invoices_service_1_1;
            },
            function (invoice_component_1_1) {
                invoice_component_1 = invoice_component_1_1;
            },
            function (ledgeraccounts_service_1_1) {
                ledgeraccounts_service_1 = ledgeraccounts_service_1_1;
            },
            function (debtors_service_1_1) {
                debtors_service_1 = debtors_service_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
            //import 'rxjs/Rx'; //for map
            InvoicesComponent = (function () {
                function InvoicesComponent(InvoicesService, router, ledgerAccountsService, debtorsService) {
                    var _this = this;
                    this.InvoicesService = InvoicesService;
                    this.router = router;
                    this.ledgerAccountsService = ledgerAccountsService;
                    this.debtorsService = debtorsService;
                    this.Invoices = [];
                    this.excludeInactive = true;
                    this.getInvoicesSuccess = true;
                    this.getDebtorsSuccess = true;
                    this.getLedgerAccountsSuccess = true;
                    this.editInvoice = false;
                    this.loadDebtors = function () {
                        var loadDebtorsThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.debtorsService.getDebtors(EntityId).subscribe(onGetDebtorsSuccess, logDebtorsError, complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                        function logDebtorsError() {
                            console.log('getDebtors Error');
                            loadDebtorsThis.getDebtorsSuccess = false;
                        }
                        function onGetDebtorsSuccess(debtors) {
                            loadDebtorsThis.debtors = debtors;
                        }
                        function complete() {
                            console.log('loadDebtors complete');
                        }
                    };
                    this.loadLedgerAccounts = function () {
                        var loadLedgerAccountsThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.ledgerAccountsService.getLedgerAccounts(true, EntityId).subscribe(onGetLedgerAccountsSuccess, logLedgerAccountsError, complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                        function logLedgerAccountsError() {
                            console.log('getLedgerAccounts Error');
                            loadLedgerAccountsThis.getLedgerAccountsSuccess = false;
                        }
                        function onGetLedgerAccountsSuccess(ledgerAccounts) {
                            loadLedgerAccountsThis.ledgerAccounts = ledgerAccounts;
                        }
                        function complete() {
                            console.log('loadLedgerAccounts complete');
                        }
                    };
                    //////////////////////////////////////////////////////////////
                    //get data
                    this.loadInvoices = function () {
                        var loadInvoicesThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.InvoicesService.getInvoices(EntityId).subscribe(onGetInvoicesSuccess, logError, complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                        function logError(e) {
                            console.log('getInvoices Error');
                            loadInvoicesThis.getInvoicesSuccess = false;
                        }
                        function complete() {
                            console.log('getInvoices complete');
                        }
                        function onGetInvoicesSuccess(data) {
                            loadInvoicesThis.Invoices = data;
                            loadInvoicesThis.gridOptions.api.setRowData(data);
                            loadInvoicesThis.gridOptions.api.sizeColumnsToFit();
                            loadInvoicesThis.getInvoicesSuccess = true;
                        }
                    };
                    /////////////////////////////////////////////////////////////
                    //grid
                    this.columnDefs = [
                        //{ field: 'datePaid', type: 'date', cellFilter: 'date:"dd/MM/yyyy"' }
                        { headerName: "Id", field: "transactionID", hide: true },
                        { headerName: "#", field: "invoiceNumber", minWidth: 100 },
                        {
                            headerName: "Date",
                            field: "transactionDate",
                            cellRenderer: function (params) {
                                return helper_service_1.HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
                            },
                            cellClass: 'rightJustify',
                        },
                        { headerName: "Owed By", field: "debtorName", minWidth: 100 },
                        { headerName: "Comment", field: "comment", minWidth: 100 },
                        {
                            headerName: "Amount",
                            field: "total",
                            cellClass: 'rightJustify',
                            cellRenderer: function (params) {
                                return helper_service_1.HelperService.noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                            minWidth: 80
                        },
                        {
                            headerName: "Date Paid",
                            field: "datePaid",
                            cellRenderer: function (params) {
                                if (params.value === null) {
                                    return '';
                                }
                                else {
                                    return helper_service_1.HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
                                }
                            },
                            cellClass: 'rightJustify',
                        },
                    ];
                    this.onRowClicked = function (params) {
                        _this.selectedInvoice = params.data;
                        console.log('Invoice onRowClicked');
                    };
                    this.onRowDoubleClicked = function (params) {
                        var selectedInvoice = params.data;
                        _this.invoiceComponent.getInvoice(selectedInvoice.transactionID, _this.ledgerAccounts, _this.debtors);
                        _this.editInvoice = true;
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor InvoicesComponent');
                    window.onresize = function () {
                        //this.gridOptions.api.sizeColumnsToFit();
                    };
                }
                InvoicesComponent.prototype.ngOnInit = function () {
                    this.loadInvoices();
                    this.loadLedgerAccounts();
                    this.loadDebtors();
                };
                InvoicesComponent.prototype.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                    this.excludeInactive = chkExcludeInactive.checked;
                    this.loadInvoices();
                };
                __decorate([
                    core_1.ViewChild(invoice_component_1.InvoiceComponent), 
                    __metadata('design:type', invoice_component_1.InvoiceComponent)
                ], InvoicesComponent.prototype, "invoiceComponent", void 0);
                InvoicesComponent = __decorate([
                    core_1.Component({
                        selector: 'ledger-accounts',
                        templateUrl: 'src/app/components/Invoices/Invoices.component.html',
                        pipes: [],
                        providers: [Invoices_service_1.InvoicesService, ledgeraccounts_service_1.LedgerAccountsService, debtors_service_1.DebtorsService],
                        //directives: [(<any>window).ag.grid.AgGridNg2, InvoiceComponent]
                        directives: [main_1.AgGridNg2, invoice_component_1.InvoiceComponent]
                    }), 
                    __metadata('design:paramtypes', [Invoices_service_1.InvoicesService, router_1.Router, ledgeraccounts_service_1.LedgerAccountsService, debtors_service_1.DebtorsService])
                ], InvoicesComponent);
                return InvoicesComponent;
            }());
            exports_1("InvoicesComponent", InvoicesComponent);
        }
    }
});
//# sourceMappingURL=invoices.component.js.map