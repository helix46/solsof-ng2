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
var GetEntity_service_1 = require('../../services/GetEntity/GetEntity.service');
var core_1 = require('@angular/core');
var entities_service_1 = require('../../services/entities/entities.service');
var helper_service_1 = require('../../services/helper/helper.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var main_1 = require('ag-grid-ng2/main');
var EntitiesComponent = (function () {
    function EntitiesComponent(router, entitiesService) {
        var _this = this;
        this.router = router;
        this.entitiesService = entitiesService;
        this.title = 'Entities';
        this.entities = [];
        this.excludeInactive = true;
        this.chkExcludeInactiveClicked = function (chkExcludeInactive) {
            _this.excludeInactive = chkExcludeInactive.checked;
            _this.loadEntities();
        };
        this.loadEntities = function () {
            var loadEntitiesThis = _this;
            if (helper_service_1.HelperService.tokenIsValid()) {
                _this.entitiesService.getEntities(_this.excludeInactive).subscribe(onGetEntitiesSuccess, logError, complete);
            }
            else {
                _this.router.navigate(['Login']);
            }
            function logError(e) {
                console.log('getEntities Error');
                loadEntitiesThis.getEntitiesError = true;
            }
            function complete() {
                console.log('getEntities complete');
            }
            function onGetEntitiesSuccess(data) {
                loadEntitiesThis.entities = data;
                loadEntitiesThis.gridOptions.api.setRowData(data);
                loadEntitiesThis.gridOptions.api.sizeColumnsToFit();
                loadEntitiesThis.getEntitiesError = false;
            }
        };
        this.columnDefs = [
            { headerName: "Id", field: "entityID", hide: true },
            { headerName: "Entity", field: "name" }
        ];
        this.onRowDoubleClicked = function (params) {
            _this.onRowClicked(params);
            _this.router.navigate(['LedgerAccounts']);
        };
        this.onRowClicked = function (params) {
            var entity = params.data;
            GetEntity_service_1.GetEntityService.getInstance().setEntityId(entity.entityID);
            console.log('onRowClicked');
        };
        this.gridOptions = helper_service_1.HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
        console.log('constructor EntitiesComponent');
        this.getEntitiesError = false;
    }
    EntitiesComponent.prototype.ngOnInit = function () {
        this.loadEntities();
        this.ServiceBase = helper_service_1.HelperService.getServiceBase();
    };
    EntitiesComponent = __decorate([
        core_1.Component({
            selector: 'entities',
            templateUrl: 'src/app/components/entities/entities.component.html',
            pipes: [],
            providers: [entities_service_1.EntitiesService],
            directives: [main_1.AgGridNg2]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, entities_service_1.EntitiesService])
    ], EntitiesComponent);
    return EntitiesComponent;
}());
exports.EntitiesComponent = EntitiesComponent;
//# sourceMappingURL=entities.component.js.map