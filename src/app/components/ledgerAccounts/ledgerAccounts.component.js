System.register(['angular2/core', '../../services/LedgerAccounts/LedgerAccounts.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, LedgerAccounts_service_1;
    var LedgerAccountsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (LedgerAccounts_service_1_1) {
                LedgerAccounts_service_1 = LedgerAccounts_service_1_1;
            }],
        execute: function() {
            //import 'rxjs/Rx'; //for map
            LedgerAccountsComponent = (function () {
                function LedgerAccountsComponent(ledgerAccountsService) {
                    this.ledgerAccountsService = ledgerAccountsService;
                    this.title = 'Ledger Accounts';
                    this.LedgerAccounts = [];
                    this.excludeInactive = true;
                    this.columnDefs = [
                        { headerName: "Id", field: "LedgerAccountID", hide: true },
                        { headerName: "Name", field: "name", cellClass: "cellClass", minWidth: 100, maxWidth: 300 },
                        { headerName: "Balance", field: "balance" },
                        { headerName: "ledgerAccountType", field: "ledgerAccountType" },
                        { headerName: "active", field: "active" },
                    ];
                    console.log('constructor LedgerAccountsComponent');
                }
                LedgerAccountsComponent.prototype.ngOnInit = function () {
                    this.loadLedgerAccounts();
                };
                LedgerAccountsComponent.prototype.onSelect = function (entity) {
                    alert(entity.name);
                };
                LedgerAccountsComponent.prototype.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                    this.excludeInactive = chkExcludeInactive.checked;
                    this.loadLedgerAccounts();
                };
                //onGetEntitiesSuccess(entities: SolsofSpa.Api.DataContext.tblEntity[]) {
                //    this.entities = entities;
                //}
                LedgerAccountsComponent.prototype.logError = function (e) {
                    console.log('getLedgerAccounts Error');
                };
                LedgerAccountsComponent.prototype.complete = function () {
                    console.log('getLedgerAccounts complete');
                };
                LedgerAccountsComponent.prototype.loadLedgerAccounts = function () {
                    var _this = this;
                    var obs = this.ledgerAccountsService.getLedgerAccounts(this.excludeInactive);
                    if (obs !== null) {
                        obs.subscribe(function (data) { return _this.LedgerAccounts = data; }, this.logError, this.complete);
                    }
                };
                ;
                LedgerAccountsComponent = __decorate([
                    core_1.Component({
                        selector: 'ledger-accounts',
                        templateUrl: 'src/app/components/LedgerAccounts/LedgerAccounts.component.html',
                        pipes: [],
                        providers: [LedgerAccounts_service_1.LedgerAccountsService],
                        directives: [window.ag.grid.AgGridNg2]
                    }), 
                    __metadata('design:paramtypes', [LedgerAccounts_service_1.LedgerAccountsService])
                ], LedgerAccountsComponent);
                return LedgerAccountsComponent;
            })();
            exports_1("LedgerAccountsComponent", LedgerAccountsComponent);
        }
    }
});
//# sourceMappingURL=ledgerAccounts.component.js.map