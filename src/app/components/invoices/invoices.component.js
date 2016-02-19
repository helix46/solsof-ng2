System.register(['angular2/router', '../../services/helper/helper.service', '../../services/GetEntity/GetEntity.service', 'angular2/core', '../../services/Invoices/Invoices.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, helper_service_1, GetEntity_service_1, core_1, Invoices_service_1;
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
            }],
        execute: function() {
            //import {AgGridNg2} from 'ag-grid-ng2/main';
            //import {GridOptions} from 'ag-grid/main';
            //import 'rxjs/Rx'; //for map
            InvoicesComponent = (function () {
                function InvoicesComponent(InvoicesService, router) {
                    var _this = this;
                    this.InvoicesService = InvoicesService;
                    this.router = router;
                    this.Invoices = [];
                    this.excludeInactive = true;
                    this.getInvoicesSuccess = true;
                    //////////////////////////////////////////////////////////////
                    //get data
                    this.logError = function (e) {
                        console.log('getInvoices Error');
                        _this.getInvoicesSuccess = false;
                    };
                    this.complete = function () {
                        console.log('getInvoices complete');
                    };
                    this.onGetInvoicesSuccess = function (data) {
                        _this.Invoices = data;
                        _this.gridOptions.api.setRowData(data);
                        _this.gridOptions.api.sizeColumnsToFit();
                        _this.getInvoicesSuccess = true;
                    };
                    this.loadInvoices = function () {
                        //var InvoicesComponentThis = this;
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.InvoicesService.getInvoices(EntityId).subscribe(_this.onGetInvoicesSuccess, _this.logError, _this.complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
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
                        _this.onRowClicked(params);
                        _this.router.navigate(['Transactions', { transactionID: _this.selectedInvoice.transactionID }]);
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor InvoicesComponent');
                    window.onresize = function () {
                        //this.gridOptions.api.sizeColumnsToFit();
                    };
                }
                InvoicesComponent.prototype.ngOnInit = function () {
                    this.loadInvoices();
                };
                InvoicesComponent.prototype.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                    this.excludeInactive = chkExcludeInactive.checked;
                    this.loadInvoices();
                };
                InvoicesComponent = __decorate([
                    core_1.Component({
                        selector: 'ledger-accounts',
                        templateUrl: 'src/app/components/Invoices/Invoices.component.html',
                        pipes: [],
                        providers: [Invoices_service_1.InvoicesService],
                        directives: [window.ag.grid.AgGridNg2]
                    }), 
                    __metadata('design:paramtypes', [Invoices_service_1.InvoicesService, router_1.Router])
                ], InvoicesComponent);
                return InvoicesComponent;
            })();
            exports_1("InvoicesComponent", InvoicesComponent);
        }
    }
});
//# sourceMappingURL=invoices.component.js.map