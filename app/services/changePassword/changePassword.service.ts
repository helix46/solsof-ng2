import {Router} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from '@angular/http';
//import {HttpHandlerService} from '../http-handler/http-handler.service';
import {HelperService} from '../helper/helper.service';
import {HttpHandlerService} from  '../http-handler/http-handler.service';


@Injectable()
export class ChangePasswordService {
    constructor(private http: Http, private router: Router) {
        HelperService.logError('constructor ChangePasswordService');
    }

    parseResponse(res: Response) {
        return res.json();
    }

    storeToken(response: any, username: any) {
    }

    changePassword(changePasswordModel: IChangePasswordModel): Observable<Response> {
        var httpHandlerService = new HttpHandlerService(this.http);
        return httpHandlerService.postObject(changePasswordModel, 'api/account/changePassword');
    }
}

