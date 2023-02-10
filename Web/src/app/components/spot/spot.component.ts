import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Spot } from 'src/app/models/spot';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css'],
})
export class SpotComponent implements OnInit, Spot {
  spotRef: AngularFireObject<Spot>;
  spot: Observable<any>;
  getSpot: any;
  name: string = '';
  description: string = '';
  realtimeHumd: string = '';
  realtimeTemp: string = '';
  realtimeLum: string = '';
  materialName: string = '';
  materialRef: string = '';
  spotId: string = '';
  plantId: string = '';
  getLoaded = false;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    db: AngularFireDatabase
  ) {
    this.spotId = this.route.snapshot.paramMap.get('spotId') || '';
    this.plantId = this.route.snapshot.paramMap.get('plantId') || '';
    this.route.paramMap.subscribe((paramMap) => {
      this.spotId = paramMap.get('spotId') || '';
    });
    this.route.paramMap.subscribe((paramMap) => {
      this.plantId = paramMap.get('plantId') || '';
    });
    this.spotRef = db.object(
      `plantations/${JSON.parse(localStorage.getItem('user') || '{}').uid}/${
        this.plantId
      }/spots/${this.spotId}`
    );

    this.spot = this.spotRef.valueChanges();
  }
  title = 'PlantIO';
  ngOnInit(): void {
    this.spotRef.snapshotChanges().subscribe((spot) => {
      console.log(spot.payload.val());
      this.getSpot = spot.payload.val();
      this.getLoaded = true;
    });
  }
}
