import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AbstractControl, FormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";




@NgModule({
    imports: [
        FormsModule,
        CommonModule,
      
    ],
    declarations: [
        AdminComponent
    ]
})

export class AdminModule{};