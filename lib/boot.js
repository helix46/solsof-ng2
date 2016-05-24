"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./components/app/app.component');
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_deprecated_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, http_1.ConnectionBackend]);
//# sourceMappingURL=boot.js.map