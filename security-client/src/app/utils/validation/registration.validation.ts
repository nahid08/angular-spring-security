import { AbstractControl } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";

export function minValidationMessage(error: any, field: FormlyFieldConfig) {
    return  `Length of ${(field.key)} should be more than ${field?.props?.minLength}`;
}

export function emailValidator(control: AbstractControl) {
    return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) ? null : {email: true} 
}

export function emailValidationMessage(error: any, field: FormlyFieldConfig) {
    return "Please enter a valid a email address";
}

export function passwordValidator(control: AbstractControl) {
    return !control.value || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(control.value) ? null : {password: true}
}

export function passwordValidationMessage(error: any, field: FormlyFieldConfig) {

    let password = field.model.password;

    let errorMsg : string[] = [];

    if(password.search(/[a-z]/) < 0) {
        errorMsg.push("You password must contain at least on capital letter.");
    }

    if (password.search(/[0-9]/) < 0) {
        errorMsg.push("Your password must contain at least one digit."); 
    }

    if(password.length < 6 || password.length > 10) {
        errorMsg.push("Your password length should be between 6 -  20")
    }

    return errorMsg.join("\n");

}