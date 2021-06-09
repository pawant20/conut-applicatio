import { Injectable } from '@angular/core';
import { LoginRegisterService } from '../services/login-register.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { completeUrl } from '../angularUrl/angularUrl';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(
    private loginRegister: LoginRegisterService,
    private router: Router
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.loginRegister.getToken()) {
      return true;
    }
    this.router.navigate([completeUrl.loginReg], {queryParams: {returnUrl : state.url}});
    return false;
  }
}
