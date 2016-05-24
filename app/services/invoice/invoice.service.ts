import {Router} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from '@angular/http';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class InvoiceService {
    constructor(private http: Http, private router: Router) {
        HelperService.logError('constructor invoiceService');
    }

    getInvoiceFromTimesheet = (timesheetId: number, entityID: number) => {
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'timesheetId',
            value: timesheetId.toString()
        };
        parameters[1] = {
            name: 'entityID',
            value: entityID.toString()
        };

        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.getObject<SolsofSpa.Helper.structTimesheetInvoiceLine>(parameters, 'api/timesheetInvoiceLineController');
    }

    saveNewInvoice(structTransaction: SolsofSpa.Helper.structTransaction): Observable<Response> {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.postObject(structTransaction, 'api/invoice');
    }

    updateInvoice(invoice: SolsofSpa.Helper.structTransaction) {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.putObject(invoice, 'api/invoice');
    }

    deleteInvoice(transactionID: number) {
        var httpHandlerService = new HttpHandlerService(this.http);
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'transactionID',
            value: transactionID.toString()
        };
        return httpHandlerService.deleteObject(parameters, 'api/invoice');
    }


    getInvoice(transactionID: number, entityID: number) {
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'transactionID',
            value: transactionID.toString()
        };
        parameters[1] = {
            name: 'entityID',
            value: entityID.toString()
        };

        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.getObject<SolsofSpa.Helper.structTransaction>(parameters, 'api/invoice');
    }



}

