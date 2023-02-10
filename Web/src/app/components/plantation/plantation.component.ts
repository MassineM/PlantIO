import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Plantation } from 'src/app/models/plantation';

@Component({
  selector: 'app-plantation',
  templateUrl: './plantation.component.html',
  styleUrls: ['./plantation.component.css'],
})
export class PlantationComponent implements OnInit, Plantation {
  plantationRef: AngularFireObject<Plantation>;
  plantation: Observable<any>;
  getPlant: Plantation | null = null;
  spotsMode = false;
  plantRef: string = '';
  name: string = '';
  description: string = '';
  spotsCount: number = 0;
  recommandHumd: string = '';
  recommandTemp: string = '';
  recommandLum: string = '';
  spots: any[] = [];
  id: string = '';
  getLoaded = false;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    db: AngularFireDatabase
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id') || '';
    });
    this.plantationRef = db.object(
      `plantations/${JSON.parse(localStorage.getItem('user') || '{}').uid}/${
        this.id
      }`
    );
    this.plantation = this.plantationRef.valueChanges();
  }
  title = 'PlantIO';
  ngOnInit(): void {
    this.plantationRef.snapshotChanges().subscribe((plantation) => {
      console.log(plantation.payload.val());
      this.getPlant = plantation.payload.val();
      this.getPlant?.spots
        ? (this.spotsCount = Object.keys(this.getPlant.spots).length)
        : 0;
      this.getLoaded = true;
    });
  }
}
