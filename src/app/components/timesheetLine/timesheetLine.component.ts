import {Component, Output, EventEmitter, Input} from 'angular2/core';

@Component({
    selector: 'timesheet-line',
    templateUrl: 'src/app/components/timesheetLine/timesheetLine.component.html',
    styleUrls: ['src/app/components/timesheetLine/timesheetLine.component.css']
})


export class TimesheetLineComponent {
    constructor() {
        console.log('constructor TimesheetLineComponent');
    }

    @Output() ok: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    //@Input() timesheetLine: ;
    @Input() edit: boolean;
    @Input() timesheetLineVisible: boolean;

    title: string;

    ngOnInit() {
        if (this.edit) {
            this.title = 'Edit Timesheet Line';
        } else {
            this.title = 'New Timesheet Line';
        }
    }

    modalOnKeyup() {
    }

    cancelTimeSheetLine = () => {
        this.cancel.emit(null);
        this.timesheetLineVisible = false;
    }

    okClick = () => {
        this.ok.emit(null);
        this.timesheetLineVisible = false;
    }
}
