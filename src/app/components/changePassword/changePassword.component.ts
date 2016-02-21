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
    getChangePasswordSuccess: boolean;

    constructor(private changePasswordService: ChangePasswordService, private router: Router) {
        this.userId = HelperService.getUsername();
        console.log('constructor ChangePasswordComponent');
        this.getChangePasswordSuccess = true;
    }

    ngOnInit() {
        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login', 'Entities']);
        }
    }
    passwordsEqual = () => {
        return this.newPassword === this.repeatNewPassword
    }


    onSubmit = () => {
        var onSubmitThis = this;
        if (this.newPassword === this.repeatNewPassword) {
            var changePasswordModel: IChangePasswordModel = {
                userName: HelperService.getUsername(),
                currentPassword: this.oldPassword,
                newPassword: this.newPassword
            }
            if (HelperService.tokenIsValid()) {
                this.changePasswordService.changePassword(changePasswordModel).subscribe(onSuccess, logError, complete);
            } else {
                this.router.navigate(['Login']);
            }
        } else {
            alert('Passwords are not the same');
        }
        function logError(resp: any) {
            alert('Password may be changed even though an error has been thrown');
            console.log('changePassword error');
            onSubmitThis.getChangePasswordSuccess = false;
        }
        function complete() {
            console.log('changePassword complete');
            setTimeout(() => this.router.navigate(['Entities']), 2000)
        }

        function onSuccess() {
            console.log('changePassword success');
            onSubmitThis.getChangePasswordSuccess = true;
        }
    }
}
