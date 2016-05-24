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
/// <reference path="../../solsof.d.ts" />
var router_deprecated_1 = require('@angular/router-deprecated');
var helper_service_1 = require('../../services/helper/helper.service');
var GetEntity_service_1 = require('../../services/GetEntity/GetEntity.service');
var core_1 = require('@angular/core');
var LedgerAccounts_service_1 = require('../../services/LedgerAccounts/LedgerAccounts.service');
var main_1 = require('ag-grid-ng2/main');
//import 'ag-grid-enterprise/main';
var LedgerAccountsComponent = (function () {
    function LedgerAccountsComponent(ledgerAccountsService, router) {
        var _this = this;
        this.ledgerAccountsService = ledgerAccountsService;
        this.router = router;
        this.LedgerAccounts = [];
        this.excludeInactive = true;
        this.getLedgerAccountsSuccess = true;
        this.chkExcludeInactiveClicked = function (chkExcludeInactive) {
            _this.excludeInactive = chkExcludeInactive.checked;
            _this.loadLedgerAccounts();
        };
        //////////////////////////////////////////////////////////////
        //get data
        this.loadLedgerAccounts = function () {
            var loadLedgerAccountsThis = _this;
            if (helper_service_1.HelperService.tokenIsValid()) {
                var EntityId = GetEntity_service_1.GetEntityService.getInstance().getEntityId();
                if (EntityId === -1) {
                    _this.router.navigate(['Entities']);
                }
                else {
                    _this.ledgerAccountsService.getLedgerAccounts(_this.excludeInactive, EntityId).subscribe(onGetLedgerAccountsSuccess, logError, complete);
                }
            }
            else {
                _this.router.navigate(['Login']);
            }
            function logError(e) {
                helper_service_1.HelperService.log('getLedgerAccounts Error');
                loadLedgerAccountsThis.getLedgerAccountsSuccess = false;
            }
            function complete() {
                helper_service_1.HelperService.log('getLedgerAccounts complete');
            }
            function onGetLedgerAccountsSuccess(data) {
                loadLedgerAccountsThis.getLedgerAccountsSuccess = true;
                loadLedgerAccountsThis.LedgerAccounts = data;
                loadLedgerAccountsThis.gridOptions.api.setRowData(data);
                loadLedgerAccountsThis.gridOptions.api.sizeColumnsToFit();
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
            helper_service_1.HelperService.log('LedgerAccount onRowClicked');
        };
        this.onRowDoubleClicked = function (params) {
            _this.onRowClicked(params);
            _this.router.navigate(['Transactions', { ledgerAccountID: _this.selectedLedgerAccount.ledgerAccountID }]);
        };
        this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
        helper_service_1.HelperService.log('constructor LedgerAccountsComponent');
        this.getLedgerAccountsSuccess = true;
        window.onresize = function () {
            //this.gridOptions.api.sizeColumnsToFit();
        };
    }
    LedgerAccountsComponent.prototype.ngOnInit = function () {
        this.loadLedgerAccounts();
    };
    LedgerAccountsComponent = __decorate([
        core_1.Component({
            selector: 'ledger-accounts',
            templateUrl: 'app/components/LedgerAccounts/LedgerAccounts.component.html',
            pipes: [],
            providers: [LedgerAccounts_service_1.LedgerAccountsService],
            //directives: [(<any>window).ag.grid.AgGridNg2]
            directives: [main_1.AgGridNg2]
        }), 
        __metadata('design:paramtypes', [LedgerAccounts_service_1.LedgerAccountsService, router_deprecated_1.Router])
    ], LedgerAccountsComponent);
    return LedgerAccountsComponent;
}());
exports.LedgerAccountsComponent = LedgerAccountsComponent;
//# sourceMappingURL=ledgerAccounts.component.js.map