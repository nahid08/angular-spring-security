import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BoardUserComponent } from "./board-user.component";



@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        BoardUserComponent
    ]
})

export class BoardUserModule{};