// That's the component that will be used to display the list of plantations

import { Component, OnInit } from '@angular/core';
import { Plantation } from '../../models/plantation';
import { PLANTS } from './testPlants';

@Component({
  selector: 'app-plantations',
  templateUrl: './plantations.component.html',
  styleUrls: ['./plantations.component.css'],
})
export class PlantationsComponent implements OnInit {
  plants = PLANTS;
  selectedPlantation?: Plantation;
  onSelect(plantation: Plantation): void {
    this.selectedPlantation = plantation;
  }
  constructor() {}

  ngOnInit(): void {}
}
