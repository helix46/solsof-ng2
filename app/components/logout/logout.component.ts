import {Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';

@Component({
    template: ''
})

export class LogoutComponent {
    constructor(public router: Router) {
    }
    ngOnInit() {
        HelperService.deleteTokenFromStorage();
        GetEntityService.getInstance().setEntityId(-1);
        this.router.navigate(['Login']);
    }
}
