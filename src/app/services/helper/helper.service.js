System.register([], function(exports_1) {
    var HelperService;
    return {
        setters:[],
        execute: function() {
            HelperService = (function () {
                function HelperService() {
                }
                HelperService.booleanToString = function (inp) {
                    if (inp) {
                        return this.sTrue;
                    }
                    else {
                        return this.sFalse;
                    }
                };
                HelperService.stringToBoolean = function (inp) {
                    if (inp === undefined) {
                        return undefined;
                    }
                    if (inp === null) {
                        return null;
                    }
                    if (inp.toLowerCase() === this.sTrue) {
                        return true;
                    }
                    return false;
                };
                HelperService.getServiceBase = function () {
                    //return 'https://solsofoz.azurewebsites.net/';
                    return 'http://localhost:10614/';
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
                HelperService.translateJavascriptDate = function (s) {
                    var day, month, year, ss, d;
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
                    if ((year === 1) && (month === 1) && (day === 1)) {
                        return null;
                    }
                    d = new Date(year, month - 1, day);
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
                HelperService.formatDate = function (d) {
                    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                };
                HelperService.formatDateForDisplay = function (d, includeTime, MonthAndYear, includeDayOfWeek) {
                    'use strict';
                    var sup, day, dayOfWeek, sDayOfWeek, month, year, hour, minute, AmPm;
                    if (d === null) {
                        return '';
                    }
                    if (MonthAndYear) {
                        month = d.getMonth();
                        year = d.getFullYear();
                        if (includeTime) {
                            //hour, minute
                            hour = d.getHours();
                            if (hour >= 12) {
                                AmPm = 'PM';
                            }
                            else {
                                AmPm = 'AM';
                            }
                            if (hour >= 12) {
                                hour -= 12;
                            }
                            minute = d.getMinutes();
                            return sDayOfWeek + ", " + this.Month_Names[month] + " " + day + sup + " " + year + " " + hour + ":" + this.pad(minute, 2) + ' ' + AmPm;
                        }
                        return this.Month_Names[month] + ". " + year;
                    }
                    day = d.getDate();
                    sup = "";
                    //if (day === 1 || day === 21 || day === 31) {
                    //    sup = "st";
                    //} else if (day === 2 || day === 22) {
                    //    sup = "nd";
                    //} else if (day === 3 || day === 23) {
                    //    sup = "rd";
                    //} else {
                    //    sup = "th";
                    //}
                    dayOfWeek = d.getDay();
                    switch (dayOfWeek) {
                        case 0:
                            sDayOfWeek = 'Sun';
                            break;
                        case 1:
                            sDayOfWeek = 'Mon';
                            break;
                        case 2:
                            sDayOfWeek = 'Tue';
                            break;
                        case 3:
                            sDayOfWeek = 'Wed';
                            break;
                        case 4:
                            sDayOfWeek = 'Thu';
                            break;
                        case 5:
                            sDayOfWeek = 'Fri';
                            break;
                        case 6:
                            sDayOfWeek = 'Sat';
                            break;
                    }
                    month = d.getMonth();
                    year = d.getFullYear();
                    if (includeTime) {
                        //hour, minute
                        hour = d.getHours();
                        if (hour >= 12) {
                            AmPm = 'PM';
                        }
                        else {
                            AmPm = 'AM';
                        }
                        if (hour >= 12) {
                            hour -= 12;
                        }
                        minute = d.getMinutes();
                        if (includeDayOfWeek) {
                            return sDayOfWeek + ", " + this.Month_Names[month] + " " + day + sup + " " + year + " " + hour + ":" + this.pad(minute, 2) + ' ' + AmPm;
                        }
                        else {
                            return this.Month_Names[month] + " " + day + sup + " " + year + " " + hour + ":" + this.pad(minute, 2) + ' ' + AmPm;
                        }
                    }
                    if (includeDayOfWeek) {
                        return sDayOfWeek + ", " + this.Month_Names[month] + " " + day + sup + " " + year;
                    }
                    else {
                        return this.Month_Names[month] + " " + day + sup + " " + year;
                    }
                };
                ;
                HelperService.pad = function (num, size) {
                    'use strict';
                    var s = String(num);
                    while (s.length < size) {
                        s = "0" + s;
                    }
                    return s;
                };
                ;
                HelperService.getInputFormatDateString = function (s, daysToAdd) {
                    if (s === '') {
                        return '';
                    }
                    else {
                        var d = this.translateJavascriptDate(s);
                        d.setDate(d.getDate() + 7);
                        var year = d.getFullYear();
                        var month = d.getMonth() + 1;
                        var day = d.getDate();
                        return this.pad(year, 4) + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);
                    }
                };
                HelperService.sTrue = 'true';
                HelperService.sFalse = 'false';
                HelperService.C_tokenName = 'idToken';
                HelperService.C_userName = 'userName';
                HelperService.C_tokenExpiryDate = 'tokenExpiryDate';
                HelperService.Month_Names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return HelperService;
            })();
            exports_1("HelperService", HelperService);
        }
    }
});
//# sourceMappingURL=helper.service.js.map