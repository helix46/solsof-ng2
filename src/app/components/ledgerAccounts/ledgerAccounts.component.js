System.register(['angular2/router', '../../services/helper/helper.service', 'angular2/core', '../../services/LedgerAccounts/LedgerAccounts.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, helper_service_1, core_1, LedgerAccounts_service_1;
    var LedgerAccountsComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (LedgerAccounts_service_1_1) {
                LedgerAccounts_service_1 = LedgerAccounts_service_1_1;
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
                    this.onGetLedgerAccountsSuccess = function (data) {
                        _this.LedgerAccounts = data;
                        _this.gridOptions.api.setRowData(data);
                        //HelperService.getInstance().autoSizeAll(this.columnDefs, this.gridOptions);
                        _this.gridOptions.api.sizeColumnsToFit();
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
                                return helper_service_1.HelperService.getInstance().noNullNumber(params.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
                            },
                            minWidth: 80
                        },
                        { headerName: "Type", field: "ledgerAccountType" },
                        { headerName: "Active", field: "active" },
                    ];
                    this.onRowDoubleClicked = function (params) {
                        _this.onRowClicked(params);
                        _this.router.navigate(['Transactions', { ledgerAccountID: _this.selectedLedgerAccount.ledgerAccountID }]);
                    };
                    this.gridOptions = helper_service_1.HelperService.getInstance().getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
                    console.log('constructor LedgerAccountsComponent');
                    window.onresize = function () {
                        _this.gridOptions.api.sizeColumnsToFit();
                        //HelperService.getInstance().autoSizeAll(this.columnDefs, this.gridOptions);
                    };
                }
                LedgerAccountsComponent.prototype.ngOnInit = function () {
                    this.loadLedgerAccounts();
                };
                LedgerAccountsComponent.prototype.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                    this.excludeInactive = chkExcludeInactive.checked;
                    this.loadLedgerAccounts();
                };
                //////////////////////////////////////////////////////////////
                //get data
                LedgerAccountsComponent.prototype.logError = function (e) {
                    console.log('getLedgerAccounts Error');
                };
                LedgerAccountsComponent.prototype.complete = function () {
                    console.log('getLedgerAccounts complete');
                };
                LedgerAccountsComponent.prototype.loadLedgerAccounts = function () {
                    //var LedgerAccountsComponentThis = this;
                    if (helper_service_1.HelperService.getInstance().tokenIsValid()) {
                        var EntityId = helper_service_1.HelperService.getInstance().getEntityId();
                        if (EntityId === -1) {
                            this.router.navigate(['Entities']);
                        }
                        else {
                            this.ledgerAccountsService.getLedgerAccounts(this.excludeInactive, EntityId).subscribe(this.onGetLedgerAccountsSuccess, this.logError, this.complete);
                        }
                    }
                    else {
                        this.router.navigate(['Login']);
                    }
                };
                ;
                LedgerAccountsComponent.prototype.onRowClicked = function (params) {
                    this.selectedLedgerAccount = params.data;
                    console.log('LedgerAccount onRowClicked');
                };
                LedgerAccountsComponent = __decorate([
                    core_1.Component({
                        selector: 'ledger-accounts',
                        templateUrl: 'src/app/components/LedgerAccounts/LedgerAccounts.component.html',
                        pipes: [],
                        providers: [LedgerAccounts_service_1.LedgerAccountsService],
                        directives: [window.ag.grid.AgGridNg2]
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