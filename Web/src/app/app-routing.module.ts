// This module is used to define the routes of the app

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { PlantationsComponent } from './components/plantations/plantations.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: AuthenticationComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
