import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../services/login-register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token;
  waitSpinner: Boolean = false;
  passwordMissMatchAlert: Boolean = true;
  inValidLinkAlert: Boolean = true;
  linkExpiredAlert: Boolean = true;
  unexPectedAlert: Boolean = true;


  constructor(
      private loginRegister: LoginRegisterService,
      private route: ActivatedRoute,
      private router: Router
    ) { }

  resetPassword(data) {
    this.waitSpinner = true;

    if (data.value.newpassword === '' || data.value.confirmnewpassword === '') {
      this.waitSpinner = false;
      return;
    }

    if (data.value.newpassword !== data.value.confirmnewpassword) {
      this.waitSpinner = false;
      this.passwordMissMatchAlert = false;
      return;
    }

    this.loginRegister.resetPassword(data.value, this.token)
    .subscribe(
      datas => {
        this.waitSpinner = false;
        this.router.navigate(['login-register']);
      },
      (error: Response) => {
        this.waitSpinner = false;
        if (error.status === 422 || error.status === 404) {
          this.inValidLinkAlert = false;
          return;
        }
        if (error.status === 400) {
          this.linkExpiredAlert = false;
          return;
        }
        if (error.status === 200) {
          this.waitSpinner = false;
          this.router.navigate(['login-register']);
          return;
        }
        this.unexPectedAlert = false;
      }
    );
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');

  }

}
