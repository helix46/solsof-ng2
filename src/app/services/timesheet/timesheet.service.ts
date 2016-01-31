import {Router} from 'angular2/router';
import {Injectable} from 'angular2/src/core/di';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from 'angular2/http';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class TimesheetService {
    constructor(private http: Http, private router: Router) {
        console.log('constructor timesheetService');
    }

    getMostRecentTimesheet(EntityId: Number) {
        var httpHandlerService = new HttpHandlerService(this.http);
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'entityID',
            value: EntityId.toString()
        };
        return httpHandlerService.getObject<string>(parameters, 'api/timesheet/getMostRecentTimesheet');
    }

    timesheet(structTimesheet: SolsofSpa.Helper.structTimesheet): Observable<string> {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.postObject<string>(structTimesheet, 'api/timesheet');
    }
}

