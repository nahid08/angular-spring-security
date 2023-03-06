import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RegistrationComponent } from "./registration.component";
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatSelectModule
    ],
    declarations: [
        RegistrationComponent
    ]
})

export class RegistrationModule{};