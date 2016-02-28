import {Component, View} from 'angular2/core';
//import {NgForm, ControlGroup, Validators, FORM_BINDINGS, FormBuilder, FORM_DIRECTIVES} from 'angular2/common';
import { Router, RouterLink } from 'angular2/router';
import { LoginService } from '../../services/login/login.service';
import {Http, Headers} from 'angular2/http';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'login',
    directives: [RouterLink],
    templateUrl: 'src/app/components/login/login.component.html',
})

export class LoginComponent {
    username: string;
    password: string;

    constructor(public router: Router, private http: Http) {
        console.log('constructor LoginComponent');
        if (HelperService.tokenIsValid()) {
            router.navigate(['Entities'])
        }
    }

    loginfinished() {
        this.router.navigate(['Entities', {}]);
    }

    loginService: LoginService = new LoginService(this.http, this.router, this.loginfinished);
    login() {
        this.loginService.authenticate(this.username, this.password);
    }
}
