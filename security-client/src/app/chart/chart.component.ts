import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  // chartOptions = {
  //   title: "My first Chart",
  //   animationEnabled: true,
  //   axisY: {
  //     includeZero: true
  //   },
  //   data: [
  //     {
  //       type: "column",
  //       indexLabelFontColor: "#5A5757",
  //       dataPoints: [
  //         { x: 10, y: 71 },
  //         { x: 20, y: 55 },
  //         { x: 30, y: 50 },
  //         { x: 40, y: 65 },
  //         { x: 50, y: 71 },
  //         { x: 60, y: 92, indexLabel: "Highest\u2191" },
  //         { x: 70, y: 68 },
  //         { x: 80, y: 38, indexLabel: "Lowest\u2193"  },
  //         { x: 90, y: 54 },
  //         { x: 100, y: 60 }
  //       ]
  //     },
      
  //   ]
  // }

  generateRandomData = () => {
		var y  = 1000, dps = [];
		for(var i = 0; i < 1000; i++) {
			y += Math.ceil(Math.random() * 10 - 5);
			dps.push({ y: y});
		}
		return dps;
	}
	chartOptions = {
	  zoomEnabled: true,
	  exportEnabled: true,
	  theme: "light2",
	  title: {
		text: "Try Canvas Chart"
	  },
	  data: [{
		type: "line",
		dataPoints: this.generateRandomData()
	  }]
	}

}
