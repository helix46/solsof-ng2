System.register(['angular2/core', '../../services/helper/helper.service', '../../services/invoice/invoice.service', 'angular2/router', '../../services/GetEntity/GetEntity.service', '../invoiceline/invoiceline.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, helper_service_1, invoice_service_1, router_1, GetEntity_service_1, invoiceline_component_1;
    var InvoiceComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (invoice_service_1_1) {
                invoice_service_1 = invoice_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            },
            function (invoiceline_component_1_1) {
                invoiceline_component_1 = invoiceline_component_1_1;
            }],
        execute: function() {
            //import {AgGridNg2} from 'ag-grid-ng2/main';
            //import {GridOptions} from 'ag-grid/main';
            InvoiceComponent = (function () {
                function InvoiceComponent(invoiceService, router) {
                    var _this = this;
                    this.invoiceService = invoiceService;
                    this.router = router;
                    this.getInvoiceSuccess = true;
                    this.ok = new core_1.EventEmitter();
                    this.invoice = {
                        comment: '',
                        debtorID: -1,
                        entityID: -1,
                        transactionID: -1,
                        transactionLineArray: [],
                        bankAccountID: -1,
                        transactionType: 5 /* Invoice */,
                        chequeNumber: -1,
                        sTransactionDate: ''
                    };
                    this.invoiceVisible = false;
                    this.calculateInvoiceTotal = function () {
                        var totalAmount = 0, i;
                        for (i = 0; i < _this.invoice.transactionLineArray.length; i = i + 1) {
                            totalAmount = totalAmount + _this.invoice.transactionLineArray[i].amount;
                        }
                        _this.invoiceTotal = helper_service_1.HelperService.formatMoney(totalAmount);
                    };
                    this.newInvoice = function (debtors) {
                        var newInvoiceThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            _this.debtors = debtors;
                            _this.titleInvoice = 'Add Invoice';
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.invoice = {
                                    transactionID: -1,
                                    entityID: EntityId,
                                    bankAccountID: -1,
                                    debtorID: -1,
                                    transactionType: 5 /* Invoice */,
                                    chequeNumber: -1,
                                    comment: '',
                                    sTransactionDate: helper_service_1.HelperService.formatDateForJSon(new Date()),
                                    transactionLineArray: []
                                };
                                _this.gridOptions.api.setRowData(_this.invoice.transactionLineArray);
                            }
                            _this.editInvoice = false;
                            _this.getInvoiceSuccess = true;
                            _this.calculateInvoiceTotal();
                            _this.invoiceVisible = true;
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                    };
                    this.getInvoice = function (invoiceID, ledgerAccounts, debtors) {
                        var getInvoiceThis = _this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            getInvoiceThis.ledgerAccounts = ledgerAccounts;
                            getInvoiceThis.debtors = debtors;
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            getInvoiceThis.titleInvoice = 'Edit Invoice';
                            getInvoiceThis.invoiceService.getInvoice(invoiceID, EntityId).subscribe(onGetInvoice, logInvoiceError);
                        }
                        else {
                            getInvoiceThis.router.navigate(['Login']);
                        }
                        function onGetInvoice(invoice) {
                            getInvoiceThis.editInvoice = true;
                            getInvoiceThis.invoice = invoice;
                            getInvoiceThis.gridOptions.api.setRowData(invoice.transactionLineArray);
                            getInvoiceThis.gridOptions.api.sizeColumnsToFit();
                            getInvoiceThis.getInvoiceSuccess = true;
                            getInvoiceThis.calculateInvoiceTotal();
                            getInvoiceThis.invoiceVisible = true;
                        }
                        function logInvoiceError() {
                            console.log('getInvoice Error');
                            getInvoiceThis.getInvoiceSuccess = false;
                        }
                    };
                    //dropdowns are not currently updating model
                    this.onChangeDebtor = function (value) {
                        var currentTarget = event.currentTarget;
                        _this.invoice.debtorID = Number(currentTarget.value);
                    };
                    this.cancelInvoice = function () {
                        _this.invoiceVisible = false;
                    };
                    this.okClicked = function () {
                        var okClickedThis = _this;
                        if (_this.editInvoice) {
                            if (helper_service_1.HelperService.tokenIsValid()) {
                                _this.invoiceService.updateInvoice(_this.invoice).subscribe(updateInvoiceSuccess, logError, complete);
                                _this.invoiceVisible = false;
                            }
                            else {
                                _this.router.navigate(['Login']);
                            }
                        }
                        else {
                            if (helper_service_1.HelperService.tokenIsValid()) {
                                _this.invoiceService.saveNewInvoice(_this.invoice).subscribe(updateInvoiceSuccess, logError, complete);
                                _this.invoiceVisible = false;
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
                            console.log('invoice complete');
                        }
                        function updateInvoiceSuccess() {
                            okClickedThis.ok.emit('');
                        }
                    };
                    this.deleteInvoiceLine = function () {
                        _this.invoice.transactionLineArray.splice(_this.selectedInvoiceLineIndex, 1);
                        _this.gridOptions.api.setRowData(_this.invoice.transactionLineArray);
                    };
                    this.saveInvoiceLine = function (savededInvoiceLine) {
                        savededInvoiceLine.ledgerAccountName = helper_service_1.HelperService.getLedgerAccountName(savededInvoiceLine.ledgerAccountID, _this.ledgerAccounts);
                        if (_this.bEditInvoiceLine) {
                            _this.invoice.transactionLineArray[_this.selectedInvoiceLineIndex] = savededInvoiceLine;
                        }
                        else {
                            _this.invoice.transactionLineArray.push(savededInvoiceLine);
                        }
                        ;
                        _this.gridOptions.api.setRowData(_this.invoice.transactionLineArray);
                        _this.calculateInvoiceTotal();
                    };
                    this.newInvoiceLine = function () {
                        //var newInvoiceLineThis = this;
                        _this.bEditInvoiceLine = false;
                        _this.invoiceLineComponent.newInvoiceLine(_this.ledgerAccounts);
                    };
                    ////////////////////////////////////
                    //grid
                    ////////////////////////////////////
                    this.columnDefs = [
                        { headerName: 'Ledger Account', field: 'ledgerAccountName' },
                        { headerName: 'Amount', field: 'amount', cellClass: 'rightJustify', cellRenderer: function (params) { return helper_service_1.HelperService.formatMoney(params.value); } },
                        { headerName: 'Comment', field: 'comment' }
                    ];
                    this.onRowClicked = function (params) {
                        //params.node.id seems to be index of data array (not row number!)
                        _this.selectedInvoiceLineIndex = params.node.id;
                    };
                    this.onRowDoubleClicked = function (params) {
                        var selectedInvoiceLine = params.data;
                        _this.bEditInvoiceLine = true;
                        _this.invoiceLineComponent.displayInvoiceline(selectedInvoiceLine, _this.ledgerAccounts);
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor invoiceComponent');
                }
                InvoiceComponent.prototype.ngOnInit = function () {
                    if (helper_service_1.HelperService.tokenIsValid() === false) {
                        this.router.navigate(['Login']);
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InvoiceComponent.prototype, "ok", void 0);
                __decorate([
                    core_1.ViewChild(invoiceline_component_1.InvoiceLineComponent), 
                    __metadata('design:type', invoiceline_component_1.InvoiceLineComponent)
                ], InvoiceComponent.prototype, "invoiceLineComponent", void 0);
                InvoiceComponent = __decorate([
                    core_1.Component({
                        selector: 'invoiceModal',
                        templateUrl: 'src/app/components/invoice/invoice.component.html',
                        styles: ['.modalSolsofVisible {display: block;}'],
                        providers: [invoice_service_1.InvoiceService],
                        directives: [window.ag.grid.AgGridNg2, invoiceline_component_1.InvoiceLineComponent]
                    }), 
                    __metadata('design:paramtypes', [invoice_service_1.InvoiceService, router_1.Router])
                ], InvoiceComponent);
                return InvoiceComponent;
            })();
            exports_1("InvoiceComponent", InvoiceComponent);
        }
    }
});
//# sourceMappingURL=invoice.component.js.map