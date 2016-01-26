

export class HelperService {
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

    static booleanToString(inp: boolean) {
        if (inp) {
            return 'true';
        } else {
            return 'false';
        }
    }

    //EntityId: number;
    //setEntityId(entityId: number) {
    //    this.EntityId = entityId;
    //}
    //getEntityId() {
    //    return this.EntityId;
    //}

    static getServiceBase(): string {
        return 'https://solsofoz.azurewebsites.net/';
        //return 'http://localhost:10614/';
    }

    static     getTokenName(): string {
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

}