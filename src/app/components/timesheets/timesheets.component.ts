import {Router} from 'angular2/router';
import {HelperService} from '../../services/helper/helper.service';
import {GetEntityService} from '../../services/GetEntity/GetEntity.service';
import {Response} from 'angular2/http';
import {Component} from 'angular2/core';
import {TimesheetsService} from '../../services/Timesheets/Timesheets.service';



@Component({
    selector: 'ledger-accounts',
    templateUrl: 'src/app/components/Timesheets/Timesheets.component.html',
    pipes: [],
    providers: [TimesheetsService],
    directives: [(<any>window).ag.grid.AgGridNg2]
})

export class TimesheetsComponent {


    constructor(private TimesheetsService: TimesheetsService, public router: Router) {
        console.log('constructor TimesheetsComponent');
        this.getTimesheetsSuccess = true;
        window.onresize = () => {
            this.gridOptions.api.sizeColumnsToFit();
        };
    }
    ngOnInit() {
        this.loadTimesheets();
    }
    //////////////////////////////////////////////////////////
    //properties
    selectedTimesheet: SolsofSpa.Api.DataContext.tblTimesheet;
    public Timesheets: SolsofSpa.Api.DataContext.tblTimesheet[] = [];
    public excludeInactive: boolean = true;
    getTimesheetsSuccess: boolean 
    //////////////////////////////////////////////////////////

    //events
    addTimesheet = () => {
        this.router.navigate(['Timesheet', { edit: "false" }]);
    }

    chkExcludeInactiveClicked = (chkExcludeInactive: HTMLInputElement) => {
        this.excludeInactive = chkExcludeInactive.checked;
        this.loadTimesheets();
    }

    /////////////////////////////////////////////////////////
    //get data
    logError = () => {
        console.log('getTimesheets Error');
        this.getTimesheetsSuccess = false;
    }

    complete = () => {
        console.log('getTimesheets complete');
    }

    onGetTimesheetsSuccess = (timesheets: SolsofSpa.Api.DataContext.tblTimesheet[]) => {
        this.Timesheets = timesheets;
        this.gridOptions.api.setRowData(timesheets);
        this.gridOptions.api.sizeColumnsToFit();
        this.getTimesheetsSuccess = true;
    }

    loadTimesheets = () => {

        if (HelperService.tokenIsValid()) {
            var EntityId = GetEntityService.getInstance().getEntityId();
            if (EntityId === -1) {
                this.router.navigate(['Entities']);
            } else {
                this.TimesheetsService.getTimesheets(EntityId).subscribe(this.onGetTimesheetsSuccess, this.logError, this.complete);
            }
        } else {
            this.router.navigate(['Login']);
        }
    };
    ////////////////////////////////////////////////
    //grid
    columnDefs: ag.grid.ColDef[] = [
        { headerName: "Id", field: "timesheetID", hide: true },
        {
            headerName: "Week Ending",
            field: "weekEnding",
            cellRenderer: function (params: any) {
                return HelperService.formatDateForDisplay(new Date(params.value), false, false, false);
            },
            cellClass: 'rightJustify',
        },
        { headerName: "Name", field: "debtorName", minWidth: 100 },
        {
            headerName: "Minutes",
            field: "minutes",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return HelperService.noNullNumber(params.value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
            },
            minWidth: 80
        },
        { headerName: "Comment", field: "comment", minWidth: 100 },
        { headerName: "#", field: "invoiceNumber", minWidth: 100 }
    ];

    onRowClicked(params: any) {
        this.selectedTimesheet = <SolsofSpa.Api.DataContext.tblTimesheet>params.data;
        console.log('Timesheet onRowClicked');
    }

    onRowDoubleClicked = (params: any) => {
        this.onRowClicked(params);
        this.router.navigate(['Timesheet', { timesheetID: this.selectedTimesheet.timesheetID, edit: true }]);
    }

    gridOptions: ag.grid.GridOptions = HelperService.getGridOptions(this.columnDefs, this.onRowClicked, this.onRowDoubleClicked);
}