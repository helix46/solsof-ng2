import {Component} from '@angular/core';
//import {NgForm, ControlGroup, Validators, FORM_BINDINGS, FormBuilder, FORM_DIRECTIVES} from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated';
import { LoginService } from '../../services/login/login.service';
import {Http, Headers} from '@angular/http';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'login',
    directives: [RouterLink],
    templateUrl: 'app/components/login/login.component.html'
})

export class LoginComponent {
    username: string;
    password: string;

    constructor(private router: Router, private http: Http) {
        HelperService.logError('constructor LoginComponent');
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
