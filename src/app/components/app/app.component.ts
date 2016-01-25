import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginComponent} from '../login/login.component';
import {EntitiesComponent} from '../../components/entities/entities.component';
import {LedgerAccountsComponent} from '../../components/LedgerAccounts/ledgerAccounts.component';
import {ChangePasswordComponent} from '../../components/changePassword/changePassword.component';
import {LogoutComponent} from '../../components/logout/logout.component';
import {HelperService} from '../../services/helper/helper.service';


@Component({
    selector: 'my-app',
    templateUrl: 'src/app/components/app/app.component.html',
    styleUrls: ['src/app/components/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', redirectTo: ['Entities'] },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/entities', name: 'Entities', component: EntitiesComponent, useAsDefault: true },
    { path: '/ledgerAccounts', name: 'LedgerAccounts', component: LedgerAccountsComponent },
    { path: '/changePassword', name: 'ChangePassword', component: ChangePasswordComponent },
    { path: '/logout', name: 'Logout', component: LogoutComponent }
])
export class AppComponent {
    public title = 'Solid Software';
    tokenValid: boolean = HelperService.getInstance().tokenIsValid();

    ngOnInit() {
        this.tokenValid = HelperService.getInstance().tokenIsValid();
    }

}
