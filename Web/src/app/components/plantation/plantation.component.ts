import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  showMode = 0;
  plantRef: string = '';
  name: string = '';
  description: string = '';
  spotsCount: number = 0;
  recommendedHumd: string = '';
  recommendedTemp: string = '';
  recommendedLum: string = '';
  spots: any[] = [];
  id: string = '';
  getLoaded = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
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
      this.getPlant = plantation.payload.val();
      this.getPlant?.spots
        ? (this.spotsCount = Object.keys(this.getPlant.spots).length)
        : 0;
      this.getLoaded = true;
    });
  }
  getMode(mode: number) {
    this.showMode = mode;
  }
}
