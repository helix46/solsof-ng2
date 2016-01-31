import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginComponent} from '../login/login.component';
import {EntitiesComponent} from '../../components/entities/entities.component';
import {LedgerAccountsComponent} from '../../components/LedgerAccounts/ledgerAccounts.component';
import {TimesheetComponent} from '../../components/timesheet/timesheet.component';
import {TimesheetsComponent} from '../../components/timesheets/timesheets.component';
import {InvoicesComponent} from '../../components/invoices/invoices.component';
import {TransactionsComponent} from '../../components/transactions/transactions.component';
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
    { path: '/changePassword', name: 'ChangePassword', component: ChangePasswordComponent },
    { path: '/entities', name: 'Entities', component: EntitiesComponent, useAsDefault: true },
    { path: '/invoices', name: 'Invoices', component: InvoicesComponent },
    { path: '/ledgerAccounts', name: 'LedgerAccounts', component: LedgerAccountsComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/logout', name: 'Logout', component: LogoutComponent },
    { path: '/timesheet', name: 'Timesheet', component: TimesheetComponent },
    { path: '/timesheets', name: 'Timesheets', component: TimesheetsComponent },
    { path: '/transactions', name: 'Transactions', component: TransactionsComponent }
])
export class AppComponent {
    public title = 'Solid Software';
    tokenValid: boolean = HelperService.tokenIsValid();

    static deviceCutoffWidth: number = 768;

    ngOnInit() {
        this.tokenValid = HelperService.tokenIsValid();

        this.navbarWithoutJquery()
    }

    navbarWithoutJquery() {
        // Navbar and dropdowns
        var toggle = document.getElementsByClassName('navbar-toggle')[0],
            collapse = document.getElementsByClassName('navbar-collapse')[0],
            dropdowns = document.getElementsByClassName('dropdown');;

        // Toggle if navbar menu is open or closed
        function toggleMenu() {
            collapse.classList.toggle('collapse');
            collapse.classList.toggle('in');
        }

        // Close all dropdown menus
        function closeMenus() {
            for (var j = 0; j < dropdowns.length; j++) {
                dropdowns[j].getElementsByClassName('dropdown-toggle')[0].classList.remove('dropdown-open');
                dropdowns[j].classList.remove('open');
            }
        }

        // Add click handling to dropdowns
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].addEventListener('click', function () {
                if (document.body.clientWidth < this.deviceCutoffWidth) {
                    var open = this.classList.contains('open');
                    closeMenus();
                    if (!open) {
                        this.getElementsByClassName('dropdown-toggle')[0].classList.toggle('dropdown-open');
                        this.classList.toggle('open');
                    }
                }
            });
        }

        // Close dropdowns when screen becomes big enough to switch to open by hover
        function closeMenusOnResize() {
            if (document.body.clientWidth >= this.deviceCutoffWidth) {
                closeMenus();
                collapse.classList.add('collapse');
                collapse.classList.remove('in');
            }
        }

        // Event listeners
        window.addEventListener('resize', closeMenusOnResize, false);
        toggle.addEventListener('click', toggleMenu, false);
    }
}
