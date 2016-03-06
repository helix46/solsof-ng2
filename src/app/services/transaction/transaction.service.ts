import {Router} from 'angular2/router';
import {Injectable} from 'angular2/src/core/di';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from 'angular2/http';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class TransactionService {
    constructor(private http: Http, private router: Router) {
        console.log('constructor transactionService');
    }

    saveNewTransaction(structTransaction: SolsofSpa.Helper.structTransaction): Observable<Response> {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.postObject(structTransaction, 'api/transaction');
    }

    updateTransaction(transaction: SolsofSpa.Helper.structTransaction) {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.putObject(transaction, 'api/transaction');
    }

    deleteTransaction(transactionID: number) {
        var httpHandlerService = new HttpHandlerService(this.http);
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'transactionID',
            value: transactionID.toString()
        };
        return httpHandlerService.deleteObject(parameters, 'api/transaction');
    }


    getTransaction(transactionID: number, entityID: number) {
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
        return httpHandlerService.getObject<SolsofSpa.Helper.structTransaction>(parameters, 'api/transaction');
    }
}

