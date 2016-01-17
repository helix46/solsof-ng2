System.register(['angular2/core', '../../services/entities/entities.service', '../../services/helper/helper.service', 'angular2/router', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, entities_service_1, helper_service_1, router_1;
    var EntitiesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (entities_service_1_1) {
                entities_service_1 = entities_service_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {}],
        execute: function() {
            EntitiesComponent = (function () {
                function EntitiesComponent(router, entitiesService) {
                    this.router = router;
                    this.entitiesService = entitiesService;
                    this.title = 'Entities';
                    this.entities = [];
                    this.excludeInactive = true;
                    this.columnDefs = [
                        { headerName: "Id", field: "entityID", hide: true },
                        { headerName: "Entity", field: "name" }
                    ];
                    console.log('constructor EntitiesComponent');
                }
                EntitiesComponent.prototype.ngOnInit = function () {
                    this.loadEntities();
                };
                EntitiesComponent.prototype.onRowClicked = function (params) {
                    var entity = params.data;
                    helper_service_1.HelperService.getInstance().setEntityId(entity.entityID);
                    console.log('');
                };
                EntitiesComponent.prototype.onRowDoubleClicked = function (params) {
                    this.onRowClicked(params);
                    this.router.navigate(['LedgerAccounts']);
                };
                EntitiesComponent.prototype.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                    this.excludeInactive = chkExcludeInactive.checked;
                    this.loadEntities();
                };
                //onGetEntitiesSuccess(entities: SolsofSpa.Api.DataContext.tblEntity[]) {
                //    this.entities = entities;
                //}
                EntitiesComponent.prototype.logError = function (e) {
                    console.log('getEntities Error');
                };
                EntitiesComponent.prototype.complete = function () {
                    console.log('getEntities complete');
                };
                EntitiesComponent.prototype.saveEntities = function (data) {
                    //this.gridOptions.rowData = data;
                    this.entities = data;
                };
                EntitiesComponent.prototype.loadEntities = function () {
                    var _this = this;
                    if (helper_service_1.HelperService.getInstance().tokenIsValid()) {
                        this.entitiesService.getEntities(this.excludeInactive).subscribe(function (data) { return _this.entities = data; }, this.logError, this.complete);
                    }
                    else {
                        this.router.navigate(['Login']);
                    }
                };
                EntitiesComponent = __decorate([
                    //for map
                    core_1.Component({
                        selector: 'entities',
                        templateUrl: 'src/app/components/entities/entities.component.html',
                        pipes: [],
                        providers: [entities_service_1.EntitiesService],
                        directives: [window.ag.grid.AgGridNg2]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, entities_service_1.EntitiesService])
                ], EntitiesComponent);
                return EntitiesComponent;
            })();
            exports_1("EntitiesComponent", EntitiesComponent);
        }
    }
});
//# sourceMappingURL=entities.component.js.map