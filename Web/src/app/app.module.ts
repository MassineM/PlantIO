import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

import { PlantationsComponent } from './components/plantations/plantations.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { SignupComponent } from './components/signup/signup.component';
import { PlantationComponent } from './components/plantation/plantation.component';
import { SpotComponent } from './components/spot/spot.component';
import { SpotsComponent } from './components/spots/spots.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantationsComponent,
    AuthenticationComponent,
    SignupComponent,
    PlantationComponent,
    SpotComponent,
    SpotsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
