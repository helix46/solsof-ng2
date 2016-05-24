import {Response} from '@angular/http';
import {Component} from '@angular/core';
import {HelperService} from '../../services/helper/helper.service';
import {ChangePasswordService} from '../../services/changePassword/changePassword.service';
import { Router, RouterLink } from '@angular/router-deprecated';

@Component({
    selector: 'changePassword',
    templateUrl: 'app/components/changePassword/changePassword.component.html',
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
        HelperService.logError('constructor ChangePasswordComponent');
        this.getChangePasswordSuccess = true;
    }

    ngOnInit() {
        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login', 'Entities']);
        }
    }
    bPasswordsEqual: boolean = true;
    passwordsEqual = () => {
        this.bPasswordsEqual = this.newPassword === this.repeatNewPassword
        return this.bPasswordsEqual;
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
            HelperService.logError('changePassword error');
            onSubmitThis.getChangePasswordSuccess = false;
        }
        function complete() {
            HelperService.logError('changePassword complete');
            setTimeout(() => this.router.navigate(['Entities']), 2000)
        }

        function onSuccess() {
            HelperService.logError('changePassword success');
            onSubmitThis.getChangePasswordSuccess = true;
        }
    }
}
