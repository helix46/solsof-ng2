import {Response} from '@angular/http';
import {Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import {HelperService} from '../../services/helper/helper.service';
import {LedgerAccountService} from '../../services/ledgerAccount/ledgerAccount.service';
import { Router, RouterLink} from '@angular/router-deprecated';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'ledgerAccountModal',
    templateUrl: 'app/components/ledgerAccount/ledgerAccount.component.html',
    styles: ['.modalSolsofVisible {display: block;}'],
    //styleUrls: ['app/components/ledgerAccount/ledgerAccount.css'],
    providers: [LedgerAccountService]
})


export class LedgerAccountComponent {
    constructor(private ledgerAccountService: LedgerAccountService, private router: Router) {
        HelperService.log('constructor LedgerAccountComponent');
    }

    editLedgerAccount: boolean;
    titleLedgerAccount: string;
    getLedgerAccountSuccess: boolean = true;
    @Output() ok: EventEmitter<string> = new EventEmitter<string>();
    ledgerAccount: SolsofSpa.Helper.tblLedgerAccount = {
        ledgerAccountID: -1,
        name: '',
        active: true,
        ledgerAccountType: SolsofSpa.Helper.ledgerAccountType.Asset,
        entityID: -1
    };
    ledgerAccountVisible: boolean = false;

    ledgerAccountTypes: IledgerAccountType[];

    ngOnInit() {

        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
        this.ledgerAccountTypes = HelperService.loadLedgerAccountTypes();
    }

    newLedgerAccount = () => {
        var newLedgerAccountThis = this;
        newLedgerAccountThis.editLedgerAccount = false;
        if (HelperService.tokenIsValid()) {
            newLedgerAccountThis.titleLedgerAccount = 'Add Ledger Account';
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                newLedgerAccountThis.router.navigate(['Entities']);
            }
            newLedgerAccountThis.getLedgerAccountSuccess = true;
            newLedgerAccountThis.ledgerAccountVisible = true;
        } else {
            newLedgerAccountThis.router.navigate(['Login']);
        }
        HelperService.log('newLedgerAccount');
    }


    getLedgerAccount = (ledgerAccountID: number ) => {
        var getLedgerAccountThis = this;
        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            getLedgerAccountThis.titleLedgerAccount = 'Edit LedgerAccount';
            getLedgerAccountThis.ledgerAccountService.getLedgerAccount(ledgerAccountID, EntityId).subscribe(onGetLedgerAccount, logLedgerAccountError);
        } else {
            getLedgerAccountThis.router.navigate(['Login']);
        }
        function onGetLedgerAccount(ledgerAccount: SolsofSpa.Helper.tblLedgerAccount) {
            getLedgerAccountThis.editLedgerAccount = true;
            getLedgerAccountThis.ledgerAccount = ledgerAccount;
            getLedgerAccountThis.getLedgerAccountSuccess = true;
            getLedgerAccountThis.ledgerAccountVisible = true;
            document.onkeydown = getLedgerAccountThis.keydown;
        }
        function logLedgerAccountError() {
            HelperService.log('getLedgerAccount Error');
            getLedgerAccountThis.getLedgerAccountSuccess = false;
        }
    }

    keydown = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
            this.cancelLedgerAccount();
        }
    }

    cancelLedgerAccount = () => {
        this.ledgerAccountVisible = false;
        document.onkeydown = null;
    }

    okClicked = () => {
        var okClickedThis = this;
        if (this.editLedgerAccount) {
            if (HelperService.tokenIsValid()) {
                this.ledgerAccountService.updateLedgerAccount(this.ledgerAccount).subscribe(updateLedgerAccountSuccess, logError, complete);
                this.ledgerAccountVisible = false;
            } else {
                this.router.navigate(['Login']);
            }
        } else {
            if (HelperService.tokenIsValid()) {
                this.ledgerAccount.entityID = GetEntityService.getInstance().getEntityId();
                this.ledgerAccountService.saveNewLedgerAccount(this.ledgerAccount).subscribe(updateLedgerAccountSuccess, logError, complete);
                this.ledgerAccountVisible = false;
            } else {
                this.router.navigate(['Login']);
            }
        }

        function logError(obj: any) {
            HelperService.log(JSON.stringify(obj));
            alert(JSON.stringify(obj));
        }
        function complete() {
            HelperService.log('ledgerAccount complete');
        }
        function updateLedgerAccountSuccess() {
            okClickedThis.ok.emit('');
        }
    }
}



