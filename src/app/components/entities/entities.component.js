System.register(['../../services/GetEntity/GetEntity.service', 'angular2/core', '../../services/entities/entities.service', '../../services/helper/helper.service', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var GetEntity_service_1, core_1, entities_service_1, helper_service_1, router_1;
    var EntitiesComponent;
    return {
        setters:[
            function (GetEntity_service_1_1) {
                GetEntity_service_1 = GetEntity_service_1_1;
            },
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
            }],
        execute: function() {
            //import {AgGridNg2} from 'ag-grid-ng2/main';
            //import {GridOptions} from 'ag-grid/main';
            EntitiesComponent = (function () {
                function EntitiesComponent(router, entitiesService) {
                    var _this = this;
                    this.router = router;
                    this.entitiesService = entitiesService;
                    this.title = 'Entities';
                    this.entities = [];
                    this.excludeInactive = true;
                    //reload grid when checkbox clicked
                    this.chkExcludeInactiveClicked = function (chkExcludeInactive) {
                        _this.excludeInactive = chkExcludeInactive.checked;
                        _this.loadEntities();
                    };
                    //////////////////////////////////////////////
                    //get data
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
                    //////////////////////////////////////////////
                    //grid
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
                //load entities when page loaded
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