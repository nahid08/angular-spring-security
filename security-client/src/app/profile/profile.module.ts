import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [
    
    ]
})

export class ProfileModule{};