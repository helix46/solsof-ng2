/// <reference path="../helper/helper.service.ts" />
import {Router} from 'angular2/router';
import {Injectable} from 'angular2/src/core/di';
import {RequestOptionsArgs, Request, Response} from 'angular2/http';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {HelperService} from '../helper/helper.service';


@Injectable()
export class LoginService {
    constructor(private http: Http, private router: Router, private callback: () => void) {
        console.log('constructor LoginService');
    }

    storeToken(response: Response, userName: string) {
        var t: ITokenresponse = <ITokenresponse>response.json()
        HelperService.getInstance().saveTokenToStorage(userName,t);
        this.callback();
    };
    logError() {
        window.alert('Error logging in');
    };

    authenticate(username: string, password: string) {
        var usernamePlusPassword = "grant_type=password&username=" + username + "&password=" + password;
        var headers = new Headers();
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var args: RequestOptionsArgs = {};
        args.headers = headers;
        var serviceBase = HelperService.getInstance().getServiceBase();

        this.http
            .post(serviceBase + 'token',
            usernamePlusPassword, args)
            .subscribe(
            response => this.storeToken(response, username),
            this.logError,
            () => console.log('Authentication Complete')
            );
    }
}