import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { completeUrl } from '../angularUrl/angularUrl';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGaurdService {

  constructor(
    private router: Router,
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    const token = localStorage.getItem('digi');
    const decoded = new JwtHelperService().decodeToken(token);

    // here we are using decoded&&decoded.user because when user is logged out there is no token to decode and browser will throw error for decoded.user
    if (decoded && decoded.user && decoded.user === 2) {
      return true;
    }
    this.router.navigate([completeUrl.loginReg]);
    return false;
  }
}
