

export class HelperService {

    private static sTrue = 'true';
    private static sFalse = 'false';

    static booleanToString(inp: boolean) {
        if (inp) {
            return this.sTrue;
        } else {
            return this.sFalse;
        }
    }

    static stringToBoolean(inp: string): boolean {
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
    }

    static getServiceBase(): string {
        return 'https://solsofoz.azurewebsites.net/';

        //return 'http://localhost:10614/';
    }

    static getTokenName(): string {
        return 'id_token';
    }

    static formatDateForJSon(d: Date) {
        var str: string;
        if (d === undefined) {
            return "";
        }
        if (d === null) {
            return "";
        }
        str = d.getFullYear().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getDate().toString();
        return str;
    };

    static formatDateAndTimeForJSon(d: Date): string {
        var str: string;
        if (d === undefined) {
            return '';
        }
        if (d === null) {
            return '';
        }
        str = d.getFullYear().toString() + '.' + (d.getMonth() + 1).toString() + '.' + d.getDate().toString() + '.' + d.getHours().toString() + '.' + d.getMinutes().toString() + '.' + d.getSeconds().toString() + '.' + d.getMilliseconds().toString();
        return str;
    };

    static translateJavascriptDateAndTime(s: string): Date {
        var day: number, month: number, year: number, hour: number, minute: number, second: number, millisecond: number, ss: string[], d: Date;
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

    static translateJavascriptDate(s: string): Date {
        var day: number, month: number, year: number, ss: string[], d: Date;
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

    static C_tokenName: string = 'idToken';
    static C_userName: string = 'userName';
    static C_tokenExpiryDate: string = 'tokenExpiryDate';

    static deleteTokenFromStorage() {
        localStorage.clear();
        console.log('localStorage cleared');
    }

    static saveTokenToStorage(userName: string, t: ITokenresponse) {
        localStorage.setItem(this.C_tokenName, t.access_token);
        var expiryDate: Date = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + t.expires_in);
        localStorage.setItem(this.C_tokenExpiryDate, HelperService.formatDateAndTimeForJSon(expiryDate));
        localStorage.setItem(this.C_userName, userName);
        console.log('token added to localStorage');
    }

    static getToken(): string {
        return localStorage.getItem(this.C_tokenName);
    }

    static getUsername(): string {
        return localStorage.getItem(this.C_userName);
    }

    static tokenIsValid(): boolean {
        var expiryDate = this.translateJavascriptDateAndTime(localStorage.getItem(this.C_tokenExpiryDate));
        if (expiryDate === null) {
            return false;
        }
        if (expiryDate < new Date()) {
            return false;
        } else {
            return true;
        }
    }

    static getUrlEncodedQueryString(parameters: modSharedTypes.IHttpParameter[]): string {
        var s = '', i = 0;
        for (i = 0; i < parameters.length; i++) {
            if (i === 0) {
                s += '';
            } else {
                s += '&';
            }
            s += parameters[i].name + '=';
            s += encodeURI(parameters[i].value);
        }
        return s;
    }
    static noNullString(inp: any): string {
        if (!inp) {
            return '';
        } else {
            return inp;
        }
    }
    static noNullNumber(inp: any): number {
        if (!inp) {
            return 0;
        } else {
            return inp;
        }
    }
    static autoSizeAll(columnDefs: ag.grid.ColDef[], gridOptions: ag.grid.GridOptions) {
        var allColumnIds: string[] = [];
        columnDefs.forEach(function (columnDef) {
            allColumnIds.push(columnDef.field);
        });
        gridOptions.columnApi.autoSizeColumns(allColumnIds);
    };
    static getGridOptions(columnDefs: ag.grid.ColDef[], onRowClicked: (params: any) => void, onRowDoubleClicked: (params: any) => void): ag.grid.GridOptions {
        var gridOptions: ag.grid.GridOptions = {
            columnDefs: columnDefs,
            rowData: null,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,            rowSelection: "single",
            onRowClicked: onRowClicked,
            onRowDoubleClicked: onRowDoubleClicked
        }
        return gridOptions;
    }
    static formatDate(d: Date): string {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    }

    static Month_Names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    static formatDateForDisplay(d: Date, includeTime: boolean, MonthAndYear: boolean, includeDayOfWeek: boolean): string {
        'use strict';
        var sup: string, day: number, dayOfWeek: number, sDayOfWeek: string, month: number, year: number, hour: number, minute: number, AmPm: string;

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
                } else {
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
            } else {
                AmPm = 'AM';
            }
            if (hour >= 12) {
                hour -= 12;
            }
            minute = d.getMinutes();
            if (includeDayOfWeek) {
                return sDayOfWeek + ", " + this.Month_Names[month] + " " + day + sup + " " + year + " " + hour + ":" + this.pad(minute, 2) + ' ' + AmPm;
            } else {
                return this.Month_Names[month] + " " + day + sup + " " + year + " " + hour + ":" + this.pad(minute, 2) + ' ' + AmPm;
            }
            //return m_names[month] + " " + sDayOfWeek + " " + day + sup + " " + year + " " + globalFunctionsObj.pad(hour, 2) + ":" + globalFunctionsObj.pad(minute, 2);
        }
        if (includeDayOfWeek) {
            return sDayOfWeek + ", " + this.Month_Names[month] + " " + day + sup + " " + year;
        } else {
            return this.Month_Names[month] + " " + day + sup + " " + year;
        }

    };

    static pad(num: number, size: number): string {
        'use strict';
        var s = String(num);
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    };

    //use this format to allow angular2 to bind to an input type="date"
    //static getInputFormatDateString(s: string, daysToAdd: number): string {
    //    if (s === '') {
    //        return '';
    //    } else {
    //        var d: Date = this.translateJavascriptDate(s);
    //        d.setDate(d.getDate() + daysToAdd);
    //        var year: number = d.getFullYear();
    //        var month: number = d.getMonth() + 1;
    //        var day: number = d.getDate();
    //        return this.pad(year, 4) + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);
    //    }
    //}
    static convertMinutesToTimeString = (pMinutes: number): string => {
        var hour = Math.floor(pMinutes / 60);
        var minute = pMinutes % 60;
        if (minute < 10) {
            return hour.toString() + ":0" + minute.toString();
        } else {
            return hour.toString() + ":" + minute.toString();
        }
    }

}




















