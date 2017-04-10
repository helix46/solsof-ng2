//import {AgGridNg2} from 'ag-grid-ng2/main';
//import {GridOptions} from 'ag-grid/main';
//import {ISCEisService} from '@angular/core';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Router} from '@angular/router-deprecated';
import {LedgerAccountsService} from '../../services/LedgerAccounts/LedgerAccounts.service';
import {BankAccountsService} from '../../services/bankAccounts/bankAccounts.service';


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
		//return 'https://solsof-spa-api.azurewebsites.net/';
        return 'https://solsof-spa-api.azurewebsites.net/';
        //return 'https://solsofoz.azurewebsites.net/';
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
        str = d.getFullYear().toString() + "-" + this.pad((d.getMonth() + 1), 2).toString() + "-" + this.pad(d.getDate(), 2).toString();
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
        str = d.getFullYear().toString() + '-' + this.pad((d.getMonth() + 1), 2).toString() + "-" + this.pad(d.getDate(), 2).toString() + '-' + d.getHours().toString() + '-' + d.getMinutes().toString() + '-' + d.getSeconds().toString() + '-' + d.getMilliseconds().toString();
        return str;
    };

    static formatMoney(value: number): string {
        if (value === null) {
            '';
        } else {
            return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
        }
    }

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

        ss = s.split('-');
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

        ss = s.split('-');
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
        HelperService.log('localStorage cleared');
    }

    static saveTokenToStorage(userName: string, t: ITokenresponse) {
        localStorage.setItem(this.C_tokenName, t.access_token);
        var expiryDate: Date = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + t.expires_in);
        localStorage.setItem(this.C_tokenExpiryDate, HelperService.formatDateAndTimeForJSon(expiryDate));
        localStorage.setItem(this.C_userName, userName);
        HelperService.log('token added to localStorage');
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
    static autoSizeAll(columnDefs: any[], gridOptions: any) {
        var allColumnIds: string[] = [];
        columnDefs.forEach(function (columnDef) {
            allColumnIds.push(columnDef.field);
        });
        gridOptions.columnApi.autoSizeColumns(allColumnIds);
    };

    static getGridOptions(columnDefs: any[], onRowClicked: (params: any) => void, onRowDoubleClicked: (params: any) => void) {
        var rowData: any[] = [];
        var gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            enableSorting: true,
            enableFilter: true,
            groupUseEntireRow: true,
            enableColResize: true,
            rowSelection: "single",
            onRowClicked: onRowClicked,
            onRowDoubleClicked: onRowDoubleClicked,
            rowGroupPanelShow: 'always',
            groupHideGroupColumns: true,
            groupColumnDef: 'groupColumn'
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

    static getLedgerAccountName = (ledgerAccountID: number, ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]): string => {
        var ledgerAccountArray: SolsofSpa.Api.DataContext.tblLedgerAccount[] = ledgerAccounts.filter(filterLedgerAccounts);
        if (ledgerAccountArray[0] !== undefined) {
            return ledgerAccountArray[0].name;
        } else {
            return '';
        }
        function filterLedgerAccounts(tblLedgerAccount: SolsofSpa.Api.DataContext.tblLedgerAccount): boolean {
            return tblLedgerAccount.ledgerAccountID === ledgerAccountID;
        }
    }




    static loadLedgerAccounts = (router: Router, ledgerAccountsService: LedgerAccountsService, onError: () => void, onSuccess: (LedgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) => void) => {
        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                router.navigate(['Entities']);
            } else {
                ledgerAccountsService.getLedgerAccounts(true, EntityId).subscribe(onGetLedgerAccountsSuccess, logLedgerAccountsError, complete);
            }
        } else {
            router.navigate(['Login']);
        }
        function logLedgerAccountsError() {
            HelperService.log('getLedgerAccounts Error');
            onError();
        }

        function onGetLedgerAccountsSuccess(ledgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[]) {
            onSuccess(ledgerAccounts);
        }
        function complete() {
            HelperService.log('loadDebtors complete');
        }
    };

    static loadBankAccounts = (router: Router, bankAccountsService: BankAccountsService, onError: () => void, onSuccess: (structLoadTransactionForm: SolsofSpa.Helper.structLoadTransactionForm) => void) => {
        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                router.navigate(['Entities']);
            } else {
                bankAccountsService.getBankAccounts(false, EntityId).subscribe(onGetBankAccountsSuccess, logBankAccountsError, complete);
            }
        } else {
            router.navigate(['Login']);
        }
        function logBankAccountsError() {
            HelperService.log('getBankAccounts Error');
            onError();
        }

        function onGetBankAccountsSuccess(structLoadTransactionForm: SolsofSpa.Helper.structLoadTransactionForm) {
            onSuccess(structLoadTransactionForm);
        }
        function complete() {
            HelperService.log('loadDebtors complete');
        }
    };

    static log = (s: string) => {
        console.log(s);
    }

    static loadLedgerAccountTypes = (): IledgerAccountType[] => {
        var ledgerAccountTypes: IledgerAccountType[] = [];
        ledgerAccountTypes.push({
            name: 'Asset',
            ledgerAccountType: SolsofSpa.Helper.ledgerAccountType.Asset
        })
        ledgerAccountTypes.push({
            name: 'Capital',
            ledgerAccountType: SolsofSpa.Helper.ledgerAccountType.Capital
        })
        ledgerAccountTypes.push({
            name: 'Expense',
            ledgerAccountType: SolsofSpa.Helper.ledgerAccountType.Expense
        })
        ledgerAccountTypes.push({
            name: 'Income',
            ledgerAccountType: SolsofSpa.Helper.ledgerAccountType.Income
        })
        ledgerAccountTypes.push({
            name: 'Liability',
            ledgerAccountType: SolsofSpa.Helper.ledgerAccountType.Liability
        })
        return ledgerAccountTypes;
    }

    //static loadBankAccounts = (router: Router, bankAccountsService: BankAccountsService, onError: () => void, onSuccess: (structLoadTransactionForm: SolsofSpa.Helper.structLoadTransactionForm) => void) => {
    //    if (HelperService.tokenIsValid()) {
    //        var EntityId = GetEntityService.getInstance().getEntityId();
    //        if (EntityId === -1) {
    //            router.navigate(['Entities']);
    //        } else {
    //            bankAccountsService.getBankAccounts(true, EntityId).subscribe(onGetBankAccountsSuccess, logBankAccountsError, complete);
    //        }
    //    } else {
    //        router.navigate(['Login']);
    //    }
    //    function logBankAccountsError() {
    //        HelperService.log('getBankAccounts Error');
    //        onError();
    //    }

    //    function onGetBankAccountsSuccess(structLoadTransactionForm: SolsofSpa.Helper.structLoadTransactionForm) {
    //        onSuccess(structLoadTransactionForm);
    //    }
    //    function complete() {
    //        HelperService.log('loadDebtors complete');
    //    }
    //};

    //static displayPdf = (response: ArrayBuffer, $sce: ISCEService) => {
    //    var file: Blob;

    //    file = new Blob([response], { type: 'application/pdf' });

    //    var fileURL = URL.createObjectURL(file);
    //    var reportContent: any = $sce.trustAsResourceUrl(fileURL);
    //    return reportContent;

    //    //$modal.open({
    //    //    templateUrl: 'app/views/reportDisplay.html?preventCache=' + new Date().toString(),
    //    //    controller: 'reportDisplayController',
    //    //    //backdrop: 'static',
    //    //    size: 'lg',
    //    //    resolve: { reportDisplayParameterObject: function () { return { reportContent: reportContent }; } }
    //    //});
    //};

}




















