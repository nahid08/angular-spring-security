import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormComponentComponent } from "./form-component.component";
import { FormlyModule } from "@ngx-formly/core";
import { emailValidator, minValidationMessage, emailValidationMessage, passwordValidator, passwordValidationMessage } from "../utils/validation/registration.validation";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
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
        FormComponentComponent
    ],
    exports: [
        FormComponentComponent
    ]
})

export class FormComponentModule{};