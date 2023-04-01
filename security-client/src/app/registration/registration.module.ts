import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { RegistrationComponent } from "./registration.component";
import {MatSelectModule} from '@angular/material/select';
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";


export function minValidationMessage(error: any, field: FormlyFieldConfig) {
    return  `Length of ${(field.key)} should be more than ${field?.props?.minLength}`;
}

export function emailValidator(control: AbstractControl) {
    return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) ? null : {ip: true} 
}

export function emailValidationMessage(error: any, field: FormlyFieldConfig) {
    return "Please enter a valid a email address";
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validators: [{name: 'ip', validation: emailValidator}],
            validationMessages: [
                {name: 'required', message: 'This field can not be empty'},
                {name: 'minLength', message: minValidationMessage},
                {name: 'ip', message: emailValidationMessage}
            ]
        }),
        FormlyBootstrapModule,
    ],
    declarations: [
        RegistrationComponent
    ]
})

export class RegistrationModule{};