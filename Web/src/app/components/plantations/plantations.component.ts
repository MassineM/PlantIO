// That's the component that will be used to display the list of plantations

import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Plantation } from '../../models/plantation';
import { Spot } from '../../models/spot';
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
  spots: Observable<any[]> | null = null;
  spotsRef: AngularFireList<Spot> | null = null;
  showMode = true;
  listPlantations: any[] = [];
  listPlantationsRef: any[] = [];
  listSpotSizes: Number[] = [];
  listTemps: Number[] = [];
  listHumds: Number[] = [];
  listLums: Number[] = [];
  getLoadedSpots = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    db: AngularFireDatabase
  ) {
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
        for (let plantation of plantations) {
          if (this.listPlantationsRef.includes(plantation.key)) {
            this.listPlantations[
              this.listPlantationsRef.indexOf(plantation.key)
            ] = JSON.parse(JSON.stringify(plantation));
          } else {
            this.listPlantationsRef.push(plantation.key);
            this.listPlantations.push(plantation);
          }
          let sumHumd = 0;
          let sumTemp = 0;
          let sumLum = 0;
          let cnt = 0;
          let tempListObj = JSON.parse(JSON.stringify(plantation.spots));
          for (let spot of Object.keys(tempListObj)) {
            tempListObj[spot].realtimeHumd
              ? (sumHumd += tempListObj[spot].realtimeHumd.valueOf())
              : (sumHumd = sumHumd);
            tempListObj[spot].realtimeTemp
              ? (sumTemp += tempListObj[spot].realtimeTemp.valueOf())
              : (sumTemp = sumTemp);
            tempListObj[spot].realtimeLum
              ? (sumLum += tempListObj[spot].realtimeLum.valueOf())
              : (sumLum = sumLum);
            cnt++;
            if (this.listPlantationsRef.includes(plantation.key)) {
              this.listHumds[this.listPlantationsRef.indexOf(plantation.key)] =
                sumHumd / cnt;
              this.listTemps[this.listPlantationsRef.indexOf(plantation.key)] =
                sumTemp / cnt;
              this.listLums[this.listPlantationsRef.indexOf(plantation.key)] =
                sumLum / cnt;
              this.listSpotSizes[
                this.listPlantationsRef.indexOf(plantation.key)
              ] = cnt;
            } else {
              this.listHumds.push(sumHumd / cnt);
              this.listTemps.push(sumTemp / cnt);
              this.listLums.push(sumLum / cnt);
              this.listSpotSizes.push(cnt);
            }
            console.log(this.listHumds, 'listHumds');
          }
        }
      });
  }
  generateId(): string {
    return Math.random().toString(36).substring(2);
  }
  addPlantation(
    name: string,
    description: string,
    recommendedHumd: string,
    recommendedTemp: string,
    recommendedLum: string
  ) {
    const newPlantation: Plantation = {
      plantRef: this.generateId(),
      name,
      description,
      recommendedHumd,
      recommendedTemp,
      recommendedLum,
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
  }
}
