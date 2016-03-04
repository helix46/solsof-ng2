System.register(['angular2/src/core/di', 'angular2/http', '../helper/helper.service', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, http_1, helper_service_1;
    var HttpHandlerService;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (helper_service_1_1) {
                helper_service_1 = helper_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            HttpHandlerService = (function () {
                function HttpHandlerService(http) {
                    this.http = http;
                    console.log('constructor HttpHandlerService');
                    this.serviceBase = helper_service_1.HelperService.getServiceBase();
                }
                //use http get to retrieve an object of type T
                //parameters: an array of name / value pairs
                HttpHandlerService.prototype.getObject = function (parameters, url) {
                    var options = this.getOptions(parameters, true);
                    return this.http.get(this.serviceBase + url, options).map(function (res) { return res.json(); });
                };
                HttpHandlerService.prototype.deleteObject = function (parameters, url) {
                    //deleteObject<T>(parameters: modSharedTypes.IHttpParameter[], url: string): Observable < any > {
                    var options = this.getOptions(parameters, true);
                    return this.http.delete(this.serviceBase + url, options);
                };
                //use http post to send an object 
                HttpHandlerService.prototype.postObject = function (parameterObj, url, includeToken) {
                    if (includeToken === void 0) { includeToken = true; }
                    //postObject<T>(parameterObj: Object, url: string, includeToken: boolean = true): Observable < Response > {
                    var options = this.postOptions(includeToken);
                    var s = JSON.stringify(parameterObj);
                    return this.http.post(this.serviceBase + url, s, options);
                };
                //use http put to send an object 
                HttpHandlerService.prototype.putObject = function (parameterObj, url, includeToken) {
                    if (includeToken === void 0) { includeToken = true; }
                    var options = this.postOptions(includeToken);
                    var s = JSON.stringify(parameterObj);
                    return this.http.put(this.serviceBase + url, s, options);
                };
                HttpHandlerService.prototype.logError = function () {
                    console.log('get Entities failed');
                };
                ;
                HttpHandlerService.prototype.parseResponse = function (res) {
                    return res.json();
                };
                HttpHandlerService.prototype.getHeaders = function (includeToken) {
                    var headers = new http_1.Headers();
                    //get login token from storage and add headers
                    var token;
                    headers.append('Accept', 'application/json');
                    headers.append('Content-Type', 'application/json');
                    if (includeToken) {
                        token = helper_service_1.HelperService.getToken();
                        headers.append('Authorization', 'Bearer ' + token);
                    }
                    return headers;
                };
                HttpHandlerService.prototype.getParameters = function (parameters) {
                    var params = new http_1.URLSearchParams(), i;
                    for (i = 0; i < parameters.length; i++) {
                        params.append(parameters[i].name, parameters[i].value);
                    }
                    params.append('preventCache', new Date().toString());
                    return params;
                };
                HttpHandlerService.prototype.getOptions = function (parameters, includeToken) {
                    var options = {};
                    var headers = this.getHeaders(includeToken);
                    var params = this.getParameters(parameters);
                    options.search = params;
                    options.headers = headers;
                    return options;
                };
                HttpHandlerService.prototype.postOptions = function (includeToken) {
                    var options = {};
                    var headers = this.getHeaders(includeToken);
                    options.headers = headers;
                    return options;
                };
                HttpHandlerService = __decorate([
                    //for map
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HttpHandlerService);
                return HttpHandlerService;
            }());
            exports_1("HttpHandlerService", HttpHandlerService);
        }
    }
});
//# sourceMappingURL=http-handler.service.js.map