// This is the authentication page component

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit() {
    // // if (this.authService.isLoggedIn) {
    // //   console.warn('Already logged in');
    // // }
    // console.log(JSON.parse(localStorage.getItem('user') || '{}'));
  }
  ngDoCheck() {}
}
