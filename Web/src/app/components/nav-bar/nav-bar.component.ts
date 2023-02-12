import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  connected: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}
  ngDoCheck() {
    this.connected = this.authService.isLoggedIn;
  }
}
