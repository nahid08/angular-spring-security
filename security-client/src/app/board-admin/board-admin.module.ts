import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BoardAdminComponent } from "./board-admin.component";



@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        BoardAdminComponent
    ]
})

export class BoardAdminModule{};