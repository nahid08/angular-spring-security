import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ResetpasswordComponent } from "./resetpassword.component";
import { FormComponentModule } from "../form-component/form-component.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormComponentModule
    ],
    declarations: [
        ResetpasswordComponent,
    ],
    providers: [
    
    ]
})

export class ResetPasswordModule{};