// This is the authentication page component

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  signUpMode = false;
  constructor(public authService: AuthService) {}
  ngOnInit() {}
  ngDoCheck() {
    const user = this.authService.userData;
  }
}
