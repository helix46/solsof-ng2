System.register(['angular2/platform/browser', 'angular2/router', './app/components/app/app.component', 'angular2/http', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, router_1, app_component_1, http_1, core;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1) {
                core = core_1;
            }],
        execute: function() {
            ag.grid.initialiseAgGridWithAngular2({ core: core });
            browser_1.bootstrap(app_component_1.AppComponent, [
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map