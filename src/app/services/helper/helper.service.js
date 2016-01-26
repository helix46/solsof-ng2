System.register([], function(exports_1) {
    var HelperService;
    return {
        setters:[],
        execute: function() {
            HelperService = (function () {
                function HelperService() {
                }
                //static instance: HelperService;
                //static isCreating: Boolean = false;
                //constructor() {
                //    this.EntityId = -1;
                //    console.log('constructor HelperService');
                //    if (!HelperService.isCreating) {
                //        throw new Error("You can't call new in Singleton instances! Call HelperService.getInstance() instead.");
                //    }
                //}
                //static getInstance() {
                //    if (HelperService.instance == null) {
                //        HelperService.isCreating = true;
                //        HelperService.instance = new HelperService();
                //        HelperService.isCreating = false;
                //    }
                //    return HelperService.instance;
                //}
                HelperService.booleanToString = function (inp) {
                    if (inp) {
                        return 'true';
                    }
                    else {
                        return 'false';
                    }
                };
                //EntityId: number;
                //setEntityId(entityId: number) {
                //    this.EntityId = entityId;
                //}
                //getEntityId() {
                //    return this.EntityId;
                //}
                HelperService.getServiceBase = function () {
                    return 'https://solsofoz.azurewebsites.net/';
                    //return 'http://localhost:10614/';
                };
                HelperService.getTokenName = function () {
                    return 'id_token';
                };
                HelperService.formatDateForJSon = function (d) {
                    var str;
                    if (d === undefined) {
                        return "";
                    }
                    if (d === null) {
                        return "";
                    }
                    str = d.getFullYear().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getDate().toString();
                    return str;
                };
                ;
                HelperService.formatDateAndTimeForJSon = function (d) {
                    var str;
                    if (d === undefined) {
                        return '';
                    }
                    if (d === null) {
                        return '';
                    }
                    str = d.getFullYear().toString() + '.' + (d.getMonth() + 1).toString() + '.' + d.getDate().toString() + '.' + d.getHours().toString() + '.' + d.getMinutes().toString() + '.' + d.getSeconds().toString() + '.' + d.getMilliseconds().toString();
                    return str;
                };
                ;
                HelperService.translateJavascriptDateAndTime = function (s) {
                    var day, month, year, hour, minute, second, millisecond, ss, d;
                    if (s === undefined) {
                        return null;
                    }
                    if (s === null) {
                        return null;
                    }
                    if (s === '') {
                        return null;
                    }
                    ss = s.split('.');
                    year = Number(ss[0]);
                    month = Number(ss[1]);
                    day = Number(ss[2]);
                    hour = Number(ss[3]);
                    minute = Number(ss[4]);
                    second = Number(ss[5]);
                    millisecond = Number(ss[6]);
                    if ((year === 1) && (month === 1) && (day === 1) && (hour === 0) && (minute === 0) && (second === 0) && (millisecond === 0)) {
                        return null;
                    }
                    d = new Date(year, month - 1, day, hour, minute, second, millisecond);
                    return d;
                };
                ;
                HelperService.deleteTokenFromStorage = function () {
                    localStorage.clear();
                    console.log('localStorage cleared');
                };
                HelperService.saveTokenToStorage = function (userName, t) {
                    localStorage.setItem(this.C_tokenName, t.access_token);
                    var expiryDate = new Date();
                    expiryDate.setSeconds(expiryDate.getSeconds() + t.expires_in);
                    localStorage.setItem(this.C_tokenExpiryDate, HelperService.formatDateAndTimeForJSon(expiryDate));
                    localStorage.setItem(this.C_userName, userName);
                    console.log('token added to localStorage');
                };
                HelperService.getToken = function () {
                    return localStorage.getItem(this.C_tokenName);
                };
                HelperService.getUsername = function () {
                    return localStorage.getItem(this.C_userName);
                };
                HelperService.tokenIsValid = function () {
                    var expiryDate = this.translateJavascriptDateAndTime(localStorage.getItem(this.C_tokenExpiryDate));
                    if (expiryDate === null) {
                        return false;
                    }
                    if (expiryDate < new Date()) {
                        return false;
                    }
                    else {
                        return true;
                    }
                };
                HelperService.getUrlEncodedQueryString = function (parameters) {
                    var s = '', i = 0;
                    for (i = 0; i < parameters.length; i++) {
                        if (i === 0) {
                            s += '';
                        }
                        else {
                            s += '&';
                        }
                        s += parameters[i].name + '=';
                        s += encodeURI(parameters[i].value);
                    }
                    return s;
                };
                HelperService.noNullString = function (inp) {
                    if (!inp) {
                        return '';
                    }
                    else {
                        return inp;
                    }
                };
                HelperService.noNullNumber = function (inp) {
                    if (!inp) {
                        return 0;
                    }
                    else {
                        return inp;
                    }
                };
                HelperService.autoSizeAll = function (columnDefs, gridOptions) {
                    var allColumnIds = [];
                    columnDefs.forEach(function (columnDef) {
                        allColumnIds.push(columnDef.field);
                    });
                    gridOptions.columnApi.autoSizeColumns(allColumnIds);
                };
                ;
                HelperService.getGridOptions = function (columnDefs, onRowClicked, onRowDoubleClicked) {
                    var gridOptions = {
                        columnDefs: columnDefs,
                        rowData: null,
                        enableSorting: true,
                        enableFilter: true,
                        enableColResize: true,
                        rowSelection: "single",
                        onRowClicked: onRowClicked,
                        onRowDoubleClicked: onRowDoubleClicked
                    };
                    return gridOptions;
                };
                HelperService.C_tokenName = 'idToken';
                HelperService.C_userName = 'userName';
                HelperService.C_tokenExpiryDate = 'tokenExpiryDate';
                return HelperService;
            })();
            exports_1("HelperService", HelperService);
        }
    }
});
//# sourceMappingURL=helper.service.js.map