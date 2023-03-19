import { Injectable, Optional } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { map, take } from "rxjs/operators";
import { DialogBoxComponent } from "./dialogBox.component";


@Injectable({
    providedIn: 'root'
})
export class DialogBoxService {

    constructor(@Optional() private matDialog: MatDialog) {};

    diaLogRef?: MatDialogRef<DialogBoxComponent>;

    open(options: any) {
        this.diaLogRef = this.matDialog.open(DialogBoxComponent, {
           data: { title: options.title, message: options.message}
        })
    }

    close() {
        this.diaLogRef?.afterClosed().pipe(
           map(res => {
                return res;
            })
        );
    }


}