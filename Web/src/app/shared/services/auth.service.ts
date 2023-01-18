// This service is used to manage authentication in the app and to store the user data in local storage when logged in.
// It also provides a method to check if the user is logged in or not.

import { Injectable, NgZone } from '@angular/core';
import { User } from '../../models/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router, // Inject Firebase auth service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log('user', user);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.ngZone.run(() => {
        //   this.router.navigate(['']);
        // });
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['connexion']);
  }
  get isLoggedIn(): boolean {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null ? true : false;
  }
  GoogleAuth() {
    // Auth logic to run auth providers
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  SetUserData(user: any) {
    // Save user data in localstorage
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // userPlantations: user.userPlantations,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  async AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
