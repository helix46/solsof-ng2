System.register(['angular2/router', '../../services/helper/helper.service', '../../services/GetEntity/GetEntity.service', 'angular2/core', '../../services/LedgerAccounts/LedgerAccounts.service', 'ag-grid-ng2/main'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, helper_service_1, GetEntity_service_1, core_1, LedgerAccounts_service_1, main_1;
    var LedgerAccountsComponent;
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
            function (LedgerAccounts_service_1_1) {
                LedgerAccounts_service_1 = LedgerAccounts_service_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
            //import 'rxjs/Rx'; //for map
            LedgerAccountsComponent = (function () {
                function LedgerAccountsComponent(ledgerAccountsService, router) {
                    var _this = this;
                    this.ledgerAccountsService = ledgerAccountsService;
                    this.router = router;
                    this.LedgerAccounts = [];
                    this.excludeInactive = true;
                    this.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                        _this.excludeInactive = chkExcludeInactive.checked;
                        _this.loadLedgerAccounts();
                    };
                    //////////////////////////////////////////////////////////////
                    //get data
                    this.logError = function (e) {
                        console.log('getLedgerAccounts Error');
                        _this.getLedgerAccountsSuccess = false;
                    };
                    this.complete = function () {
                        console.log('getLedgerAccounts complete');
                    };
                    this.onGetLedgerAccountsSuccess = function (data) {
                        _this.getLedgerAccountsSuccess = true;
                        _this.LedgerAccounts = data;
                        _this.gridOptions.api.setRowData(data);
                        //HelperService.autoSizeAll(this.columnDefs, this.gridOptions);
                        _this.gridOptions.api.sizeColumnsToFit();
                    };
                    this.loadLedgerAccounts = function () {
                        if (helper_service_1.HelperService.tokenIsValid()) {
                            var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                            if (EntityId === -1) {
                                _this.router.navigate(['Entities']);
                            }
                            else {
                                _this.ledgerAccountsService.getLedgerAccounts(_this.excludeInactive, EntityId).subscribe(_this.onGetLedgerAccountsSuccess, _this.logError, _this.complete);
                            }
                        }
                        else {
                            _this.router.navigate(['Login']);
                        }
                    };
                    /////////////////////////////////////////////////////////////
                    //grid
                    this.columnDefs = [
                        { headerName: "Id", field: "LedgerAccountID", hide: true },
                        { headerName: "Name", field: "name", minWidth: 100 },
                        {
                            headerName: "Bal.",
                            field: "balance",
                            cellClass: 'rightJustify',
                            cellRenderer: function (params) {
                                return helper_service_1.HelperService.formatMoney(params.value);
                            },
                            minWidth: 80
                        },
                        { headerName: "Type", field: "ledgerAccountType" },
                        { headerName: "Active", field: "active" },
                    ];
                    this.onRowClicked = function (params) {
                        _this.selectedLedgerAccount = params.data;
                        console.log('LedgerAccount onRowClicked');
                    };
                    this.onRowDoubleClicked = function (params) {
                        _this.onRowClicked(params);
                        _this.router.navigate(['Transactions', { ledgerAccountID: _this.selectedLedgerAccount.ledgerAccountID }]);
                    };
                    this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor LedgerAccountsComponent');
                    this.getLedgerAccountsSuccess = true;
                    window.onresize = function () {
                        _this.gridOptions.api.sizeColumnsToFit();
                        //HelperService.autoSizeAll(this.columnDefs, this.gridOptions);
                    };
                }
                LedgerAccountsComponent.prototype.ngOnInit = function () {
                    this.loadLedgerAccounts();
                };
                LedgerAccountsComponent = __decorate([
                    core_1.Component({
                        selector: 'ledger-accounts',
                        templateUrl: 'src/app/components/LedgerAccounts/LedgerAccounts.component.html',
                        pipes: [],
                        providers: [LedgerAccounts_service_1.LedgerAccountsService],
                        directives: [main_1.AgGridNg2]
                    }), 
                    __metadata('design:paramtypes', [LedgerAccounts_service_1.LedgerAccountsService, router_1.Router])
                ], LedgerAccountsComponent);
                return LedgerAccountsComponent;
            })();
            exports_1("LedgerAccountsComponent", LedgerAccountsComponent);
        }
    }
});
//# sourceMappingURL=ledgerAccounts.component.js.map