import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { RegistrationComponent } from "./registration.component";
import {MatSelectModule} from '@angular/material/select';
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";
import { emailValidator, minValidationMessage, emailValidationMessage, passwordValidator, passwordValidationMessage } from "../utils/validation/registration.validation";




@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validators: [{name: 'email', validation: emailValidator}, {name: 'password', validation: passwordValidator}],
            validationMessages: [
                {name: 'required', message: 'This field can not be empty'},
                {name: 'minLength', message: minValidationMessage},
                {name: 'email', message: emailValidationMessage},
                {name: 'password', message: passwordValidationMessage}
            ]
        }),
        FormlyBootstrapModule,
    ],
    declarations: [
        RegistrationComponent
    ]
})

export class RegistrationModule{};