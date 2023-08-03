import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

    chartOptions = {
      title: "My first Chart",
      animationEnabled: true,
      axisy: {
        includeZero: true
      },
      data: [
        {
          type: "column",
          indexLabelFontColor: "#5A5757",
          dataPoints: [
            { x: 10, y: 71 },
            { x: 20, y: 55 },
            { x: 30, y: 50 },
            { x: 40, y: 65 },
            { x: 50, y: 71 },
            { x: 60, y: 92, indexLabel: "Highest\u2191" },
            { x: 70, y: 68 },
            { x: 80, y: 38, indexLabel: "Lowest\u2193"  },
            { x: 90, y: 54 },
            { x: 100, y: 60 }
          ]
        },
        
      ]
    }

}
