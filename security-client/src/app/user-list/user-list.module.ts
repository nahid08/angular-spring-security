import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list.component";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule
    ],
    declarations: [
        UserListComponent
    ]
})

export class UserListModule{};