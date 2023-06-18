import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ForgetpasswordComponent } from "./forgetpassword.component";
import { FormComponentModule } from "../form-component/form-component.module";




@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        FormComponentModule
      
    ],
    declarations: [
        ForgetpasswordComponent
    ]
})

export class ForgetPasswordModule{};