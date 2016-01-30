﻿import {Router} from 'angular2/router';
import {Injectable} from 'angular2/src/core/di';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from 'angular2/http';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class InvoicesService {
    constructor(private http: Http, private router: Router) {
        console.log('constructor InvoicesService');
    }

    parseResponse(res: Response) {
        return res.json();
    }

    getInvoices(EntityId: number): Observable<SolsofSpa.Api.DataContext.spGetInvoices_Result[]> {

        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'entityID',
            value: EntityId.toString()
        };

        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.getObject<SolsofSpa.Api.DataContext.spGetInvoices_Result[]>(parameters, 'api/invoices');
    }
}

