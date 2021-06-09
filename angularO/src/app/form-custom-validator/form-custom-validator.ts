import { AbstractControl, ValidationErrors } from '@angular/forms';

export class formCustomValidator {

    constructor() {
    }
    
    static connotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as String).indexOf(' ') >= 0) {
            return {connotContainSpace: true };
        }
        return null;
    }
}
