import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BoardModeratorComponent } from "./board-moderator.component";



@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        BoardModeratorComponent
    ]
})

export class BoardModeratorModule{};