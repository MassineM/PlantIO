// This module is used to define the routes of the app

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { PlantationsComponent } from './components/plantations/plantations.component';
import { PlantationComponent } from './components/plantation/plantation.component';
import { SpotComponent } from './components/spot/spot.component';

const routes: Routes = [
  { path: '', component: PlantationsComponent, canActivate: [AuthGuard] },
  {
    path: 'connexion',
    component: AuthenticationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plantation/:id',
    component: PlantationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'spot/:plantId/:spotId',
    component: SpotComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// plantations/z4tNTBeIVKdRUKH3AOmo1iO8VxM2/-NMuCXElJSIbULMQ4Xg2/spots
// plantations/z4tNTBeIVKdRUKH3AOmo1iO8VxM2/-NMuCXElJSIbULMQ4Xg2/spots.json
