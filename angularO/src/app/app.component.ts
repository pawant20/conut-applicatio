import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LoginRegisterService } from './services/login-register.service';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { completeUrl } from './angularUrl/angularUrl';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  copyRightYear: number = new Date().getFullYear();
  public isMenuCollapsed = true;
  public isLoggedin: boolean;
  public userName;
  userBehavSubscptn: Subscription;
  loading;
  public userLoginData;
  contactUrl: string;
  aboutUrl: string;
  homeUrl: string;
  loginUrl: string;
  profileUrl: string;
  ordersUrl: string;

  constructor(
    private loginRegister: LoginRegisterService,
    private router: Router
  ) {
    this.loading = true;
  }

  logoutUser() {
    this.isMenuCollapsed = true;
    this.loginRegister.logout().subscribe(
      data => {
        this.loginRegister.logoutProcess();
      },
      (error: Response) => {
        this.loginRegister.logoutProcess();
      }
    );
  }

  initUrls() {
    this.contactUrl = completeUrl.contact;
    this.aboutUrl = completeUrl.about;
    this.homeUrl = completeUrl.home;
    this.loginUrl = completeUrl.loginReg;
    this.profileUrl = completeUrl.profile;
    this.ordersUrl = completeUrl.myOrders;
  }

  async ngOnInit() {
    // this check if already logged in then update user:BehaviorSubject
    if (this.loginRegister.getToken()) {
      const token = localStorage.getItem('digi');
      const decoded = new JwtHelperService().decodeToken(token);
      this.loginRegister.updateUserData({
        isLoggedin: true,
        userName: decoded.name,
        userlevel: decoded.user
      });

      // in case if the token is removed from backend then user should
      // be logged out from front end as well
      this.loginRegister.getUserInfo().subscribe(
        data => {
          console.log('login in backend as well');
        },
        (error: Response) => {
          // here error is thrown means token is not present in backend
          this.loginRegister.logoutProcess();
        }
      );
    }

    this.userBehavSubscptn = this.loginRegister.userLoginData.subscribe(data => {
      this.userLoginData = data;
      this.isLoggedin = this.userLoginData.isLoggedin;
      this.userName = this.userLoginData.userName;
    });

    this.initUrls();
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
        }
      });
  }
  ngOnDestroy(): void {
    this.userBehavSubscptn.unsubscribe();
  }
}

