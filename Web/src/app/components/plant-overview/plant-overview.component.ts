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
          labels: ['tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon'],
          datasets: [
            {
              label: 'Temperature',
              data: [25, 26, 23.5, 23, 24, 25, 24.5],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
      });
      this.chart = new Chart('canvas-humd', {
        type: 'line',
        data: {
          labels: ['tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon'],
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
          labels: ['tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon'],
          datasets: [
            {
              label: 'Luminosity',
              data: [2217, 2014, 1951, 2148, 2346, 2940, 2383],
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
