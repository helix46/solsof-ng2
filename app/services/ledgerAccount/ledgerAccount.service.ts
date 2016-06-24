import {Router} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from '@angular/http';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class LedgerAccountService {
    constructor(private http: Http, private router: Router) {
        HelperService.log('constructor LedgerAccountService');
    }

    saveNewLedgerAccount(structLedgerAccount: SolsofSpa.Helper.tblLedgerAccount): Observable<Response> {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.postObject(structLedgerAccount, 'api/ledgerAccount');
    }

    updateLedgerAccount(ledgerAccount: SolsofSpa.Helper.tblLedgerAccount) {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.putObject(ledgerAccount, 'api/ledgerAccount');
    }

    deleteLedgerAccount(ledgerAccountID: number) {
        var httpHandlerService = new HttpHandlerService(this.http);
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'ledgerAccountID',
            value: ledgerAccountID.toString()
        };
        return httpHandlerService.deleteObject(parameters, 'api/ledgerAccount');
    }


    getLedgerAccount(ledgerAccountID: number, entityID: number) {
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'ledgerAccountID',
            value: ledgerAccountID.toString()
        };
        parameters[1] = {
            name: 'entityID',
            value: entityID.toString()
        };

        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.getObject<SolsofSpa.Helper.tblLedgerAccount>(parameters, 'api/ledgerAccount');
    }
}

