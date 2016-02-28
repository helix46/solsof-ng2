import {Component, Output, EventEmitter} from 'angular2/core';
import {HelperService} from '../../../services/helper/helper.service';

export const enum enumModalType {
    dialog = 0,
    alert = 1
}

@Component({
    selector: 'dialog-box',
    templateUrl: 'src/app/components/utilities/dialogBox/dialogBox.component.html',
    styles: ['.modalSolsofVisible {display: block;}', '.modalCancelHidden {display: none;}']
})
export class DialogBoxComponent {


    constructor() {
        console.log('constructor DialogBoxComponent');
    }

    @Output() OK: EventEmitter<any> = new EventEmitter();
    message: string = '';
    cancelLabel: string = 'Cancel';
    okLabel: string = 'Ok';
    dialogBoxVisible: boolean = false;
    fnConfirmed: () => void;
    enumModalType: enumModalType = enumModalType.dialog;
    cancelVisible: boolean = true;

    ngOnInit() {
    }

    cancel = () => {
        this.dialogBoxVisible = false;
    }

    ok() {
        this.dialogBoxVisible = false;
        if (this.enumModalType === enumModalType.dialog) { 
            this.fnConfirmed();
        }
    }

    displayDialogBox = (message: string, fnConfirmed: () => void) => {
        this.enumModalType= enumModalType.dialog;
        this.message = message;
        this.fnConfirmed = fnConfirmed;
        this.dialogBoxVisible = true;
        this.cancelVisible = true;
    }

    alert = (message: string) => {
        this.enumModalType = enumModalType.alert;
        this.message = message;
        this.dialogBoxVisible = true;
        this.cancelVisible = false;
    }

}
