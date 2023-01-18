// That's the home page component of the app

import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
  title = 'PlantIO';
  ngDoCheck() {
    const user = this.authService.userData;
    console.log('user', user);
  }
}
