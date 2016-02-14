import {Component, Output, EventEmitter, Input} from 'angular2/core';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'timesheet-line',
    templateUrl: 'src/app/components/timesheetLine/timesheetLine.component.html',
    styleUrls: ['src/app/components/timesheetLine/timesheetLine.component.css']
})


export class TimesheetLineComponent {
    constructor() {
        console.log('constructor TimesheetLineComponent');
    }

    @Output() saver: EventEmitter<SolsofSpa.Helper.structTimesheetLine> = new EventEmitter();
    timesheetLineVisible: boolean;
    timesheetLineDate: string;
    startHours: number;
    startMinutes: number;
    finishHours: number;
    finishMinutes: number;
    timeoutHours: number;
    timeoutMinutes: number;


    titleTimesheetLine: string;

    ngOnInit() {
    }

    displayTimesheetline = (selectedTimesheetLine: SolsofSpa.Helper.structTimesheetLine) => {
        this.titleTimesheetLine = 'Edit Timesheet Line';
        this.timesheetLineDate = selectedTimesheetLine.sTimesheetLineDate;
        this.startHours = Math.floor(selectedTimesheetLine.startTimeMinutes / 60);
        this.startMinutes = selectedTimesheetLine.startTimeMinutes % 60;
        this.finishHours = Math.floor(selectedTimesheetLine.finishTimeMinutes / 60);
        this.finishMinutes = selectedTimesheetLine.finishTimeMinutes % 60;
        this.timeoutHours = Math.floor(selectedTimesheetLine.timeoutMinutes / 60);
        this.timeoutMinutes = selectedTimesheetLine.timeoutMinutes % 60;

        this.timesheetLineVisible = true;
    }

    modalOnKeyup() {
    }

    cancelTimeSheetLine = () => {
        this.timesheetLineVisible = false;
    }

    saveTimeSheetLine() {
        var selectedTimesheetLine: SolsofSpa.Helper.structTimesheetLine = {
            sTimesheetLineDate: this.timesheetLineDate,
            startTimeMinutes: this.startHours * 60 + this.startMinutes,
            finishTimeMinutes: this.finishHours * 60 + this.finishMinutes,
            timeoutMinutes: this.timeoutHours * 60 + this.timeoutMinutes
        }
        this.saver.emit(selectedTimesheetLine);
        this.timesheetLineVisible = false;
    }
}
