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
        return httpHandlerService.getObject<SolsofSpa.Helper.structTimesheet>(parameters, 'api/timesheet/getMostRecentTimesheet');
    }

    saveNewTimesheet(structTimesheet: SolsofSpa.Helper.structTimesheet): Observable<Response> {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.postObject(structTimesheet, 'api/timesheet');
    }

    updateTimesheet(timesheet: SolsofSpa.Helper.structTimesheet) {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.putObject(timesheet, 'api/timesheet');
    }

    deleteTimesheet(timesheetID: number) {
        var httpHandlerService = new HttpHandlerService(this.http);
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'timesheetID',
            value: timesheetID.toString()
        };
        return httpHandlerService.deleteObject(parameters, 'api/timesheet');
    }


    getTimesheet(timesheetID: number, entityID: number) {
        var parameters: modSharedTypes.IHttpParameter[] = [];
        parameters[0] = {
            name: 'timesheetID',
            value: timesheetID.toString()
        };
        parameters[1] = {
            name: 'entityID',
            value: entityID.toString()
        };

        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.getObject<SolsofSpa.Helper.structTimesheet>(parameters, 'api/timesheet');
    }
}

