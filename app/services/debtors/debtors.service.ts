import {Router} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from '@angular/http';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class DebtorsService {
    constructor(private http: Http, private router: Router) {
        HelperService.log('constructor debtorsService');
    }

    parseResponse(res: Response) {
        return res.json();
    }

    getDebtors(EntityId: number) {

        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'entityID',
            value: EntityId.toString()
        };

        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.getObject(parameters, 'api/debtors');
    }
}

