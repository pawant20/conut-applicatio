import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';
import { completeUrl } from '../angularUrl/angularUrl';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGaurdsService implements CanActivate {

  constructor(
    private loginRegister: LoginRegisterService,
    private router: Router,
  ) { }

  canActivate() {
    if (!this.loginRegister.getToken()) {
      return true;
    }
    this.router.navigate([completeUrl.home]);
    return false;
  }

}
