import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AbstractControl, FormsModule } from "@angular/forms";
import { ConfirmUserComponent } from "./confirm-user.component";




@NgModule({
    imports: [
        FormsModule,
        CommonModule,
      
    ],
    declarations: [
        ConfirmUserComponent
    ]
})

export class RegistrationModule{};