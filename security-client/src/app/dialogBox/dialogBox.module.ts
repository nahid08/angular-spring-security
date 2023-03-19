import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogBoxComponent } from "./dialogBox.component";
import { DialogBoxService } from "./dialogBox.service";



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatDialogModule
    ],
    declarations: [
        DialogBoxComponent
    ],
    exports: [
        DialogBoxComponent
    ],
    entryComponents: [
        DialogBoxComponent
    ],
    providers: [
        DialogBoxService,       
    ]
})

export class DialogBoxModule{};