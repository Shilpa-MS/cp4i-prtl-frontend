import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class emailValidator {

    public static strong(control: FormControl): ValidationResult {
        let emailPattern_tcs = /^[a-z0-9._%+-]+@tcs+[.]+com/.test(control.value);
        let emailPattern_ibm = /^[a-z0-9._%+-]+@ibm+[.]+co+[.]+in/.test(control.value);
        let emailPattern_ibm1 = /^[a-z0-9._%+-]+@in+[.]+ibm+[.]+com/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = emailPattern_tcs || emailPattern_ibm || emailPattern_ibm1;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }
}