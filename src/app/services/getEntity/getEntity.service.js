System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GetEntityService;
    return {
        setters:[],
        execute: function() {
            GetEntityService = (function () {
                function GetEntityService() {
                    this.EntityId = -1;
                    console.log('constructor HelperService');
                    if (!GetEntityService.isCreating) {
                        throw new Error("You can't call new in Singleton instances! Call HelperService.getInstance() instead.");
                    }
                }
                GetEntityService.getInstance = function () {
                    if (GetEntityService.instance == null) {
                        GetEntityService.isCreating = true;
                        GetEntityService.instance = new GetEntityService();
                        GetEntityService.isCreating = false;
                    }
                    return GetEntityService.instance;
                };
                GetEntityService.prototype.setEntityId = function (entityId) {
                    this.EntityId = entityId;
                };
                GetEntityService.prototype.getEntityId = function () {
                    return this.EntityId;
                };
                GetEntityService.isCreating = false;
                return GetEntityService;
            }());
            exports_1("GetEntityService", GetEntityService);
        }
    }
});
//# sourceMappingURL=GetEntity.service.js.map