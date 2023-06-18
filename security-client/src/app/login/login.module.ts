import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { RouterModule } from "@angular/router";



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        LoginComponent
    ]
})

export class LoginModule{};