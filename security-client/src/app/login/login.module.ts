import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";



@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        LoginComponent
    ]
})

export class LoginModule{};