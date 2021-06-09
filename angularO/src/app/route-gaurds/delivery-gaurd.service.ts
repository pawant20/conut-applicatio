import { Injectable } from '@angular/core';
import { completeUrl } from '../angularUrl/angularUrl';
import { Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DeliveryGaurdService {

  constructor(
    private router: Router
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    const token = localStorage.getItem('digi');
    const decoded = new JwtHelperService().decodeToken(token);

    if (decoded && decoded.user && decoded.user === 1) {
      return true;
    }

    this.router.navigate([completeUrl.loginReg]);
    return false;
  }
}
