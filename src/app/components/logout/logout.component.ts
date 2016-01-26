import {Component} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    template: ''
})

export class LogoutComponent {
    constructor(public router: Router) {
    }
    ngOnInit() {
        HelperService.deleteTokenFromStorage();
        this.router.navigate(['Login']);
    }
}
