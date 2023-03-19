import { Component, HostListener, Inject } from "@angular/core";
import {  MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
    selector: 'dialog-box',
    templateUrl: './dialogBox.html',
    styleUrls: []
  })
export class DialogBoxComponent {


   constructor(@Inject (MAT_DIALOG_DATA) public data: Data, public mdRef: MatDialogRef<DialogBoxComponent>) {};

    close() {
      this.mdRef.close();
    }

    @HostListener("keydown.esc")
    onEsc() {
      this.mdRef.close();
    }

}


type Data = {
  title?: string,
  message?: string
}