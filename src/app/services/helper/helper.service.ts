

export class HelperService {
    static instance: HelperService;
    static isCreating: Boolean = false;

    constructor() {
        this.EntityId = -1;
        console.log('constructor HelperService');
        if (!HelperService.isCreating) {
            throw new Error("You can't call new in Singleton instances! Call HelperService.getInstance() instead.");
        }
    }

    static getInstance() {
        if (HelperService.instance == null) {
            HelperService.isCreating = true;
            HelperService.instance = new HelperService();
            HelperService.isCreating = false;
        }

        return HelperService.instance;
    }

    booleanToString(inp: boolean) {
        if (inp) {
            return 'true';
        } else {
            return 'false';
        }
    }

    EntityId: number;
    setEntityId(entityId: number) {
        this.EntityId = entityId;
    }
    getEntityId() {
        return this.EntityId;
    }

    getServiceBase(): string {
        //return  'https://solsofoz.azurewebsites.net/';
        return 'http://localhost:10614/';
    }

    getTokenName(): string {
        return 'id_token';
    }

    formatDateForJSon(d: Date) {
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

    formatDateAndTimeForJSon(d: Date): string {
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

    translateJavascriptDateAndTime(s: string): Date {
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

    C_tokenName: string = 'idToken';
    C_userName: string = 'userName';
    C_tokenExpiryDate: string = 'tokenExpiryDate';

    saveTokenToStorage(userName: string, t: ITokenresponse) {
        localStorage.setItem(this.C_tokenName, t.access_token);
        var expiryDate: Date = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + t.expires_in);
        localStorage.setItem(this.C_tokenExpiryDate, HelperService.getInstance().formatDateAndTimeForJSon(expiryDate));
        localStorage.setItem(this.C_userName, userName);
        console.log('token added to localStorage');
    }

    getToken(): string {
        return localStorage.getItem(this.C_tokenName);
    }

    getUsername(): string {
        return localStorage.getItem(this.C_userName);
    }

    tokenIsValid(): boolean {
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

    getUrlEncodedQueryString(parameters: modSharedTypes.IHttpParameter[]): string {
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
}