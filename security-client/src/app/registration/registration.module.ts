import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RegistrationComponent } from "./registration.component";



@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        RegistrationComponent
    ]
})

export class RegistrationModule{};