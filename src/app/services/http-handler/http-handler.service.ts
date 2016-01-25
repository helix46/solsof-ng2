﻿//import {Router} from 'angular2/router';
import {Injectable} from 'angular2/src/core/di';
import {Http, Headers, HTTP_PROVIDERS, RequestOptionsArgs, Request, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {HelperService} from '../helper/helper.service';
import 'rxjs/Rx'; //for map

@Injectable()
export class HttpHandlerService {
    constructor(private http: Http) {
        console.log('constructor HttpHandlerService');
        this.serviceBase = HelperService.getInstance().getServiceBase()
    }

    serviceBase: string;

    //use http get to retrieve an object of type T
    //parameters: an array of name / value pairs
    getObject<T>(parameters: modSharedTypes.IHttpParameter[], url: string): Observable<T> {
        var options: RequestOptionsArgs = this.getOptions(parameters, true);
        return this.http.get(this.serviceBase + url, options).map(res=> res.json());
    }

    //use http post to send an object 
    postObject<T>(parameterObj: Object, url: string, includeToken: boolean = true): Observable<T> {
        var options: RequestOptionsArgs = this.postOptions(includeToken);
        var s = JSON.stringify(parameterObj);
        return this.http.post(this.serviceBase + url, s, options).map(res=> res.json());
    }


    logError() {
        console.log('get Entities failed');

    };

    parseResponse(res: Response) {
        return res.json();
    }

    getHeaders(includeToken: boolean): Headers {
        var headers = new Headers();
        //get login token from storage and add headers
        var token: string;

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        if (includeToken) {
            token = HelperService.getInstance().getToken();
            headers.append('Authorization', 'Bearer ' + token);
        }
        return headers;
    }


    getParameters(parameters: modSharedTypes.IHttpParameter[]) {
        var params: URLSearchParams = new URLSearchParams(), i: number;
        for (i = 0; i < parameters.length; i++) {
            params.append(parameters[i].name, parameters[i].value);
        }
        params.append('preventCache', new Date().toString());
        return params;
    }

    getOptions(parameters: modSharedTypes.IHttpParameter[], includeToken: boolean) {
        var options: RequestOptionsArgs = {};
        var headers = this.getHeaders(includeToken);
        var params: URLSearchParams = this.getParameters(parameters);
        options.search = params;
        options.headers = headers;
        return options;
    }

    postOptions(includeToken: boolean) {
        var options: RequestOptionsArgs = {};
        var headers = this.getHeaders(includeToken);
        options.headers = headers;
        return options;
    }
}

    

