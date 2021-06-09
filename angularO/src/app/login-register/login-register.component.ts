import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../services/login-register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formCustomValidator } from '../form-custom-validator/form-custom-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  hidePassword = true;
  constructor(
    private loginRegister: LoginRegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  get mobile() {
    return this.loginForm.get('mobile');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get regName() {
    return this.userRegisterForm.get('name');
  }
  get regEmail() {
    return this.userRegisterForm.get('email');
  }
  get regMobile() {
    return this.userRegisterForm.get('mobile');
  }
  get regPassword() {
    return this.userRegisterForm.get('password');
  }
  get regConfirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }
  get forgotEmail() {
    return this.forgotPasswordForm.get('email');
  }

  public forgotWaitSpinner: Boolean = false;
  public loginWaitSpinner: Boolean = false;

  public loginUI: Boolean = true;
  public registerUI: Boolean = false;
  public forgotPasswordUI: Boolean = false;

  public emailSentAlert: Boolean = true;
  public passwordMissMatchAlert = true;
  public emailDoesnotExistAlert = true;
  public unExpectedErrorAlert = true;
  public duplicateRegistrationAlert = true;

  public disableLoginButton = false;
  public disableRegisterButton = false;
  public disableForgotButton = false;

  returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

  loginForm = new FormGroup({
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      formCustomValidator.connotContainSpace
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  userRegisterForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      formCustomValidator.connotContainSpace
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });


  forgotPasswordUi() {
    this.loginUI = false;
    this.registerUI = false;
    this.forgotPasswordUI = true;
  }

  loginUi() {
    this.loginUI = true;
    this.registerUI = false;
    this.forgotPasswordUI = false;
  }

  registerUi() {
    this.loginUI = false;
    this.registerUI = true;
    this.forgotPasswordUI = false;
  }
  loginData() {
    this.loginWaitSpinner = true;
    this.disableLoginButton = true;

    if (this.loginForm.invalid) {
      this.loginWaitSpinner = false;
      this.disableLoginButton = false;
      return;
    }
    this.loginRegister.login(this.loginForm.value).subscribe(
      data => {
        if (data) {
          this.loginWaitSpinner = false;
          this.disableLoginButton = false;
          /**
           * following DRY principle
           * it is used by loginData(data) and userRegisterData(data)
           */
          this.loginRegister.loginProcess(data);
          this.router.navigate([this.returnUrl]);
        }
      }
      , (error: Response) => {
        this.loginWaitSpinner = false;
        this.disableLoginButton = false;
        if (error.status === 400) {
          this.loginForm.setErrors({
            inValidLogin: true
          });
        } else {
          this.loginForm.setErrors({
            unExpectedError: true
          });
          this.unExpectedErrorAlert = false;
        }
      }
    );

  }
  userRegister() {
    this.disableRegisterButton = true;

    /**
     * set custom error on password mismatch so that forms valid status changes to false
     */
    if (this.userRegisterForm.value.password !== this.userRegisterForm.value.confirmPassword) {
      this.userRegisterForm.setErrors({
        passwordMissMatch: true
      });
      this.passwordMissMatchAlert = false;
      this.disableRegisterButton = false;
    }

    if (this.userRegisterForm.invalid) {
      this.disableRegisterButton = false;
      return;
    }

    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')|| '/';
    this.loginRegister.createUser(this.userRegisterForm.value).subscribe(
      data => {
        this.disableRegisterButton = false;
        this.loginRegister.loginProcess(data);
        this.router.navigate([this.returnUrl]);
      },
      (error: Response) => {
        this.disableRegisterButton = false;
        if (error.status === 422) {
          const err: any = error;
        } else if (error.status === 443) {
          this.duplicateRegistrationAlert = false;
        } else {
          this.unExpectedErrorAlert = false;
        }
      }
    );
  }
  forgotPassword() {
    this.disableForgotButton = true;
    if (this.forgotPasswordForm.invalid) {
      this.disableForgotButton = false;
      return;
    }
    this.forgotWaitSpinner = true;
    this.loginRegister.forgotPassword(this.forgotPasswordForm.value).subscribe(
      data => {
        this.disableForgotButton = false;
        this.emailSentAlert = false;
        this.forgotWaitSpinner = false;
      },
      (error: Response) => {
        this.disableForgotButton = false;
        if (error.status == 422) {
          this.forgotPasswordForm.setErrors({
            emailNotFound: true
          });
          this.emailDoesnotExistAlert = false;
        } else {
          this.unExpectedErrorAlert = false;
        }
        this.forgotWaitSpinner = false;
      }
    );
  }



  ngOnInit() {
  }

}
