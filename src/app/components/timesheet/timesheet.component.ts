import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';
import {TimesheetService} from '../../services/timesheet/timesheet.service';
import {DebtorsService} from '../../services/debtors/debtors.service';
import { Router, RouterLink, RouteParams} from 'angular2/router';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';



@Component({
    selector: 'timesheet',
    templateUrl: 'src/app/components/timesheet/timesheet.component.html',
    providers: [TimesheetService, DebtorsService]
})

export class TimesheetComponent {

    constructor(private timesheetService: TimesheetService, private router: Router, private debtorsService: DebtorsService, private routeParams: RouteParams) {
        console.log('constructor timesheetComponent');
        this.timesheetError = false;
        this.currentDebtorID = -1;
        this.timesheeet = {
            comment: '',
            debtorID: -1,
            entityID: GetEntityService.getInstance().getEntityId(),
            sWeekEnding: '',
            timesheetID: -1,
            timesheetLineArray: []
        };
        this.weekEnding;
    }

    debtors: SolsofSpa.Api.DataContext.tblDebtor[];
    edit: boolean;
    title: string;
    currentDebtorID: number;
    timesheeet: SolsofSpa.Helper.structTimesheet;
    weekEnding: string;
    comment: string;

    dateChange() {
        //alert(this.weekEnding);
        var d: Date = new Date(this.weekEnding);
        alert(d);
    }

    ngOnInit() {
        var edit: any = this.routeParams.params['edit'];
        this.edit = HelperService.stringToBoolean(edit);
        if (this.edit) {
            this.title = 'Edit Timesheet';
        } else {
            this.title = 'New Timesheet';
        }
        if (HelperService.tokenIsValid() === false) {
            this.router.navigate(['Login']);
        }
        var EntityId = GetEntityService.getInstance().getEntityId();
        if (EntityId === -1) {
            this.router.navigate(['Entities']);
        } else {
            this.debtorsService.getDebtors(EntityId).subscribe(this.ongetDebtors, this.logGetDebtorsError);
            this.timesheetService.getMostRecentTimesheet(EntityId).subscribe(this.onGetMostRecentTimesheet, this.logError);
        }
    }

    logGetDebtorsError(obj: any) {
        var s = JSON.stringify(obj);
        console.log(s);
        alert(s);
    }

    onGetMostRecentTimesheet = (mostRecentTimesheet: SolsofSpa.Helper.structTimesheet) => {
        var __this: TimesheetComponent = this;
        __this.timesheeet.debtorID = mostRecentTimesheet.debtorID;
        //var d: Date = HelperService.translateJavascriptDate(mostRecentTimesheet.sWeekEnding)
        __this.weekEnding = HelperService.getInputFormatDateString(mostRecentTimesheet.sWeekEnding, 7);
    }

    ongetDebtors = (debtors: SolsofSpa.Api.DataContext.tblDebtor[]) => {
        this.debtors = debtors;
    }

    onChange(value: any) {
        var currentTarget: HTMLSelectElement = <HTMLSelectElement>event.currentTarget;
        this.currentDebtorID = Number(currentTarget.value);
    }

    onSelect(debtor: SolsofSpa.Api.DataContext.tblDebtor) {
    }
    selectedDebtor: SolsofSpa.Api.DataContext.tblDebtor;

    timesheetError: boolean;
    logError(obj: any) {
        console.log(JSON.stringify(obj));
        alert(JSON.stringify(obj));
        this.timesheetError = true;
    }
    complete() {
        console.log('timesheet complete');
        this.router.navigate(['TimeSheets']);
    }

    okClick() {
        var structTimesheet: SolsofSpa.Helper.structTimesheet = {
            comment: '',
            debtorID: this.selectedDebtor.debtorID,
            entityID: GetEntityService.getInstance().getEntityId(),
            timesheetID: -1,
            sWeekEnding: '',
            timesheetLineArray: []
        }
        if (HelperService.tokenIsValid()) {
            this.timesheetService.timesheet(structTimesheet).subscribe(resp=> alert('resp'), this.logError, this.complete);
        } else {
            this.router.navigate(['Login']);
        }
    }
}
