// That's the component that will be used to display the list of plantations

import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Plantation } from '../../models/plantation';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-plantations',
  templateUrl: './plantations.component.html',
  styleUrls: ['./plantations.component.css'],
})
export class PlantationsComponent implements OnInit {
  plantationsRef: AngularFireList<Plantation>;
  plantations: Observable<any[]>;
  selectedPlantation?: Plantation;
  showMode = true;
  listPlantations: any[] = [];
  listSpotSizes: Number[] = [];
  onSelect(plantation: Plantation): void {
    this.selectedPlantation = plantation;
  }
  constructor(
    private router: Router,
    public authService: AuthService,
    db: AngularFireDatabase
  ) {
    // this.plantations = db.list<Plantation>('plantations').valueChanges();
    this.plantationsRef = db.list(
      `plantations/${JSON.parse(localStorage.getItem('user') || '{}').uid}`
    );
    this.plantations = this.plantationsRef.valueChanges();
  }
  title = 'PlantIO';
  ngDoCheck() {
    const user = this.authService.userData;
  }

  ngOnInit(): void {
    this.plantationsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((plantations) => {
        console.log(plantations);
        // this.listPlantations = plantations;
        for (let plantation of plantations) {
          this.listPlantations.push(plantation);
          plantation.spots
            ? this.listSpotSizes.push(Object.keys(plantation.spots).length)
            : this.listSpotSizes.push(0);
        }
      });
  }
  generateId(): string {
    return Math.random().toString(36).substring(2);
  }
  addPlantation(
    name: string,
    description: string,
    recommandHumd: string,
    recommandTemp: string,
    recommandLum: string
  ) {
    const newPlantation: Plantation = {
      plantRef: this.generateId(),
      name,
      description,
      recommandHumd,
      recommandTemp,
      recommandLum,
      spots: [],
    };
    this.plantationsRef
      .push(newPlantation)
      .then((res) => {
        this.showMode = true;
      })
      .catch((err) => {
        window.alert(err);
      });
  }
  viewPlantation(plantationID: any) {
    this.router.navigate(['/plantation', plantationID]);
    // console.log(plantationID);
  }
}
