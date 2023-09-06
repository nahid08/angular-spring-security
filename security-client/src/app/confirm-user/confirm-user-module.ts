import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ConfirmUserComponent } from "./confirm-user.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ConfirmUserComponent
    ],
    providers: [
    
    ]
})

export class ConfirmUserModule{};