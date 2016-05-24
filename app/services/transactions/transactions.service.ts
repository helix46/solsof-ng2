import {Router} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from '@angular/http';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class TransactionsService {
    constructor(private http: Http, private router: Router) {
        HelperService.log('constructor TransactionsService');
    }

    parseResponse(res: Response) {
        return res.json();
    }

    getTransactions(entityID: number, ledgerAccountID: number, listDateDescending: boolean): Observable<SolsofSpa.Api.DataContext.tblTransaction[]> {

        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'entityID',
            value: entityID.toString()
        };
        parameters[1] = {
            name: 'ledgerAccountID',
            value: ledgerAccountID.toString()
        };
        parameters[2] = {
            name: 'listDateDescending',
            value: HelperService.booleanToString(listDateDescending)
        };

        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.getObject<SolsofSpa.Api.DataContext.tblTransaction[]>(parameters, 'api/Transactions');
    }
}

