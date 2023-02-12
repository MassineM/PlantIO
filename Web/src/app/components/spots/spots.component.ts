import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Spot } from 'src/app/models/spot';

@Component({
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.css'],
})
export class SpotsComponent implements OnInit {
  spots: Observable<any[]>;
  spotsRef: AngularFireList<Spot>;
  getPlant: any;
  showMode = true;
  listSpots: any[] = [];
  listSpotsRef: any[] = [];
  @Input() plantId: string = '';
  selectedSpot?: Spot;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    db: AngularFireDatabase
  ) {
    this.plantId = this.route.snapshot.paramMap.get('plantId') || '';
    this.route.paramMap.subscribe((paramMap) => {
      this.plantId = paramMap.get('id') || '';
    });
    this.spotsRef = db.list(
      `plantations/${JSON.parse(localStorage.getItem('user') || '{}').uid}/${
        this.plantId
      }/spots`
    );
    this.spots = this.spotsRef.valueChanges();
  }
  title = 'PlantIO';
  ngDoCheck() {
    const user = this.authService.userData;
  }

  ngOnInit(): void {
    this.spotsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((spots) => {
        for (let spot of spots) {
          if (this.listSpotsRef.includes(spot.key)) {
            this.listSpots[this.listSpotsRef.indexOf(spot.key)] = JSON.parse(
              JSON.stringify(spot)
            );
          } else {
            this.listSpots.push(spot);
          }
        }
      });
  }
  selectSpot(spot: Spot) {
    this.selectedSpot = spot;
  }
  generateId(): string {
    return Math.random().toString(36).substring(2);
  }
  addSpot(
    name: string,
    description: string,
    materialName: string,
    materialRef: string
  ) {
    const newSpot: Spot = {
      name: name,
      description: description,
      realtimeHumd: 0,
      realtimeTemp: 0,
      realtimeLum: 0,
      materialName: materialName,
      materialRef: materialRef,
    };

    this.spotsRef.push(newSpot).then((res) => {
      this.showMode = true;
      // this.router.navigate([`/spot/${this.plantId}/${res.key}`]);
    });
  }
  viewSpot(spot: Spot) {
    this.router.navigate([`/spot/${this.plantId}/${spot.key}`]);
  }
}
