import { Component, OnInit } from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

@Component({
  selector: 'app-plant-overview',
  templateUrl: './plant-overview.component.html',
  styleUrls: ['./plant-overview.component.css'],
})
export class PlantOverviewComponent implements OnInit {
  chart: Chart | undefined;
  getLoaded = false;
  constructor() {
    this.chart = undefined;
  }
  ngOnInit() {
    setTimeout(() => {
      this.chart = new Chart('canvas-temp', {
        type: 'line',
        data: {
          labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
          datasets: [
            {
              label: 'Temperature',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        // make the chart responsive
        options: {
          responsive: true,
        },
        // options: {
        //   legend: {
        //     display: false,
        //   },
        //   scales: {
        //     xAxes: [{
        //       type: 'linear',
        //       position: 'bottom',
        //       scaleLabel: {
        //         display: true,
        //         labelString: 'Month'
        //       }
        //     }],
        //     yAxes: [{
        //       type: 'linear',
        //       position: 'left',
        //       scaleLabel: {
        //         display: true,
        //         labelString: 'Sales'
        //       }
        //     }]
        //   },
        // },
      });
      this.chart = new Chart('canvas-humd', {
        type: 'line',
        data: {
          labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
          datasets: [
            {
              label: 'Humidity',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
      });
      this.chart = new Chart('canvas-lum', {
        type: 'line',
        data: {
          labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
          datasets: [
            {
              label: 'Luminosity',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
      });
    }, 100);
  }
}
