import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';
import {ChangePasswordService} from '../../services/changePassword/changePassword.service';
import { Router, RouterLink } from 'angular2/router';
//import 'rxjs/Rx'; //for map



@Component({
    selector: 'changePassword',
    templateUrl: 'src/app/components/changePassword/changePassword.component.html',
    providers: [ChangePasswordService]
})

export class ChangePasswordComponent {
    public oldPassword: string;
    public newPassword: string;
    public repeatNewPassword: string;
    public userId: string; 

    constructor(private changePasswordService: ChangePasswordService, private router: Router) {
        this.userId = HelperService.getInstance().getUsername();
        console.log('constructor ChangePasswordComponent');
        this.success = false;
        this.error = false;
    }

    logError(resp: any) {
        console.log(resp.text());
        this.error = true;
    }
    complete() {
        console.log('changePassword complete');
        this.success = true;
    }

    onSubmit() {
        this.submitted = true;

        var changePasswordModel: IChangePasswordModel = {
            userName: HelperService.getInstance().getUsername(),
            currentPassword: this.oldPassword,
            newPassword: this.newPassword
        }

        if (HelperService.getInstance().tokenIsValid()) {
            this.changePasswordService.changePassword(changePasswordModel).subscribe(data => alert(data), this.logError, this.complete);
        } else {
            this.router.navigate(['Login']);
        }
    }

    submitted = false;
    success = false;
    error = false;
}
