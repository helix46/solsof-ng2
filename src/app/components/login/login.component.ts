import {Component, View} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { LoginService } from '../../services/login/login.service';
import {Http, Headers} from 'angular2/http';
import {HelperService} from '../../services/helper/helper.service';



@Component({
    selector: 'login'
})
@View({
    templateUrl: 'src/app/components/login/login.component.html',
    directives: [RouterLink]
})
export class LoginComponent {
    constructor(public router: Router, private http: Http) {
        console.log('constructor LoginComponent');
        if (HelperService.getInstance().tokenIsValid()) {
            router.navigate(['Entities'])
        }
    }

    loginfinished() {
        this.router.navigate(['Entities', {}]);
    }

    loginService: LoginService = new LoginService(this.http, this.router, this.loginfinished);
    username: string;
    password: string;
    login() {
        this.loginService.authenticate(this.username, this.password);
    }
}
