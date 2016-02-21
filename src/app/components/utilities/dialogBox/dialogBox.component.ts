import {Component, Output, EventEmitter} from 'angular2/core';
import {HelperService} from '../../../services/helper/helper.service';

@Component({
    selector: 'dialog-box',
    templateUrl: 'src/app/components/utilities/dialogBox/dialogBox.component.html',
    styles: ['.modalSolsofVisible {display: block;}']
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

    ngOnInit() {
    }

    cancel = () => {
        this.dialogBoxVisible = false;
    }

    ok() {
        this.dialogBoxVisible = false;
        this.fnConfirmed();
    }

    displayDialogBox = (message: string, fnConfirmed: () => void) => {
        this.message = message;
        this.fnConfirmed = fnConfirmed;
        this.dialogBoxVisible = true;
    }
}
