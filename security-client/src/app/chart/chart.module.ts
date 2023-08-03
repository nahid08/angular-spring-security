import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {  FormsModule } from "@angular/forms";
import { ChartComponent } from "./chart.component";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CanvasJSAngularChartsModule
    ],
    declarations: [
        ChartComponent
    ]
})

export class ChartModule{};