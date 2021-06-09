import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../apiUrls/apiUrls';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { eagerUrl } from '../angularUrl/angularUrl';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private user: BehaviorSubject<Object> = new BehaviorSubject<Object>({isLoggedin: false, userName: '', userlevel: null});
  userLoginData = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls,
    private router: Router
  ) { }

  // to update user:BehaviorSubject for keeping state info
  updateUserData(data: Object) {
    this.user.next(data);
  }

  login(data) {
    return this.http.post(this.apiUrls.loginUrl, data);
  }

  // to logout from backend
  logout() {
    return this.http.post(this.apiUrls.logoutUrl, null);
  }

  logoutProcess() {
        /**
         * removing this status check
         * irrespective of of status code the stored token will be removed browser
         * Scenario: when reset password the token will be removed from DB
         * and when user will try to logout from another logged in browser
         * he will not be able to logout as token is removed from DB and backend
         * will return other tha 200
         *
         */
        // if (error.status === 200) {
          alert('logged out');
          localStorage.removeItem('digi');
          localStorage.removeItem('user');
          this.updateUserData({isLoggedin: false, userName: ''});
          this.router.navigate([eagerUrl.home]);
        // } else {
        //   alert(error)
        // }
        // alert(error);
  }

  getToken() {
    return localStorage.getItem('digi');
  }

  getUser() {
    return localStorage.getItem('user');
  }

  createUser(data) {
    return this.http.post(this.apiUrls.createUserUrl, data);
  }

  updateUser(data) {
    const toUpdateData = {
      address1 : data.address1,
      zip : data.zip,
      landmark : data.landmark,
      city : data.city
    };
    return this.http.patch(this.apiUrls.updateUserUrl, toUpdateData);
  }

  updateUserInfoProfile(data) {
    return this.http.patch(this.apiUrls.updateUserUrl, data);
  }

  async loginProcess(data) {
    const respnseJSON: any = data;
    await localStorage.setItem('digi', respnseJSON.token);
    const token = await localStorage.getItem('digi');

    const decoded = new JwtHelperService().decodeToken(token);

    this.updateUserData({
      isLoggedin: true,
      userName: decoded.name,
      userlevel: decoded.user
    });
  }

  forgotPassword(data) {
    return this.http.post(this.apiUrls.forgotPasswordUrl, data);
  }

  resetPassword(pass, token) {
    const data = {
      newpassword: pass.newpassword,
      token
    };
    return this.http.post(this.apiUrls.emailResetPasswordUrl, data);
  }

  getUserInfo() {
    return this.http.get(this.apiUrls.getUserInfoUrl);
  }

  userProfile(data) {
    return this.http.post(this.apiUrls.userProfile, data);
  }

  updatePassword(data) {
    return this.http.post(this.apiUrls.updatePassword, data);
  }

  insertUserDate(data) {
    return this.http.post(this.apiUrls.insertDeliverDateUrl, data);
  }
}
