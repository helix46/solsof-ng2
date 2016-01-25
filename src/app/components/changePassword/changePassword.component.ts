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
        this.changePasswordError = false;
    }

    ngOnInit() {
        if (HelperService.getInstance().tokenIsValid() === false) {
            this.router.navigate(['Login', 'Entities']);
        }
    }
    passwordsEqual() {
        return this.newPassword === this.repeatNewPassword
    }

    logError(resp: any) {
        console.log(resp.text());
        //alert is temporary until browser is made aware that this.error has changed and error message is displayed
        alert(resp.text());
        this.changePasswordError = true;
    }
    complete() {
        console.log('changePassword complete');
        alert('changePassword success');
        //this.router.navigate(['Entities']);
        this.success = true;
    }

    onSubmit() {
        if (this.newPassword === this.repeatNewPassword) {
            this.submitted = true;
            var changePasswordModel: IChangePasswordModel = {
                userName: HelperService.getInstance().getUsername(),
                currentPassword: this.oldPassword,
                newPassword: this.newPassword
            }
            if (HelperService.getInstance().tokenIsValid()) {
                this.changePasswordService.changePassword(changePasswordModel).subscribe(resp=> alert('resp'), this.logError, this.complete);
            } else {
                this.router.navigate(['Login']);
            }
        } else {
            alert('Passwords are not the same');
        }
    }

    submitted = false;
    success = false;
    changePasswordError = false;
}
