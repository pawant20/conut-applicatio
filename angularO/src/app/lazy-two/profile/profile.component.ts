import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../services/login-register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LazyTwoService } from '../lazyTwoServices/lazy-two.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  referalData;
  constructor(
    private login: LoginRegisterService,
    private lazyTwo: LazyTwoService
  ) { }

  get regOldPassword() {
    return this.upatePasswordForm.get('oldPassword');
  }
  get regPassword() {
    return this.upatePasswordForm.get('password');
  }
  get regConfirmPassword() {
    return this.upatePasswordForm.get('confirmPassword');
  }
  get userInfoName() {
    return this.upateUserInfoForm.get('name');
  }
  get userInfoEmail() {
    return this.upateUserInfoForm.get('email');
  }
  get userInfoMobile() {
    return this.upateUserInfoForm.get('mobile');
  }
  get userAddress1() {
    return this.upateUserAddressForm.get('address1');
  }
  get userAddressCity() {
    return this.upateUserAddressForm.get('city');
  }
  get userAddressZip() {
    return this.upateUserAddressForm.get('zip');
  }
  get userAddressLandmark() {
    return this.upateUserAddressForm.get('landmark');
  }

  updateData = null;

  loadingSpinner: Boolean = true;
  editUserInfoUI: Boolean = false;
  editUserAddressUi: Boolean = false;
  updatePasswordUi: Boolean = false;
  updatePasswordButtonUi: Boolean = true;

  unExpectedAlert: Boolean = true;
  passwordMissMatchAlert: Boolean = true;
  IncorrectCurrentPassowrdAlert: Boolean = true;
  unexpectedErrorUpdatePasswordAlert: Boolean = true;
  updateInfoFailedAlert: Boolean = true;
  profileUi = true;
  passwordSuccessUi = false;
  passwordFailedUi = false;

  upatePasswordForm = new FormGroup({
    oldPassword : new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    password : new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword : new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  upateUserInfoForm = new FormGroup({
    name : new FormControl('', [
      Validators.required,
    ]),
    email : new FormControl({value: '', disabled: true},
    [
      Validators.required,
      Validators.email
    ]),
    mobile : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ])
  });


  upateUserAddressForm = new FormGroup({
    address1 : new FormControl('', [
      Validators.required
    ]),
    city : new FormControl('', [
      Validators.required
    ]),
    zip : new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ]),
    landmark : new FormControl('')
  });
  upateDateForm = new FormGroup(
    {
      insertDate : new FormControl()
    }
  );

  updateDate = () => {
    this.login.insertUserDate(this.upateDateForm.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  editUserInfo = () => {
    this.editUserInfoUI = !this.editUserInfoUI;
    this.setUserInfoValue(this.updateData);
  }
  editUserAddress = () => {
    this.editUserAddressUi = !this.editUserAddressUi;
    this.setUserAddressValue(this.updateData);
  }

  updatePasswordButton = () => {
    this.updatePasswordUi = !this.updatePasswordUi;
    this.updatePasswordButtonUi = ! this.updatePasswordButtonUi;
  }
  updateUserInfo = () => {
    this.updateInfoProcess(this.upateUserInfoForm.value);
    this.editUserInfoUI = !this.editUserInfoUI;
  }
  updateUserAddress = () => {
    this.updateInfoProcess(this.upateUserAddressForm.value);
    this.editUserAddressUi = !this.editUserAddressUi;
  }


  setUserInfoValue = (data) => {
    this.userInfoName.setValue(data.name);
    this.userInfoEmail.setValue(data.email);
    this.userInfoMobile.setValue(data.mobile);
  }
  setUserAddressValue = (data) => {
    this.userAddress1.setValue(data.address1);
    this.userAddressCity.setValue(data.city);
    this.userAddressZip.setValue(data.zip);
    this.userAddressLandmark.setValue(data.landmark);
  }

  updateInfoProcess = (data) => {
    this.loadingSpinner = true;
    const updates = Object.keys(data);
    this.login.updateUserInfoProfile(data).subscribe(
      resData => {
        this.loadingSpinner = false;
        updates.forEach((update) => this.updateData[update] = data[update]);
      },
      (error: Response) => {
        this.loadingSpinner = false;
        this.updateInfoFailedAlert = false;
      }
    );
  }


  updatePassword = () => {
    if (this.upatePasswordForm.value.password !== this.upatePasswordForm.value.confirmPassword) {
      this.upatePasswordForm.setErrors({
        passwordMissMatch : true
      });
      this.passwordMissMatchAlert = false;
      return;
    }
    if (this.upatePasswordForm.valid) {
      this.login.updatePassword(this.upatePasswordForm.value).subscribe(
        data => {
          this.updatePasswordUi = !this.updatePasswordUi;
          this.login.logoutProcess();
        },
        (error: Response) => {
          if (error.status === 422) {
            this.IncorrectCurrentPassowrdAlert = false;
            return;
          }
          this.unexpectedErrorUpdatePasswordAlert = false;
        }
      );
    }
  }

  getReferalInfo = () => {
    this.lazyTwo.getMyRefdata().subscribe(
      data => {
        this.referalData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.login.userProfile(this.updateData).subscribe(
      data => {
        this.updateData = data;
        this.loadingSpinner = false;
      },
      error => {
        this.unExpectedAlert = false;
      }
    );
    this.getReferalInfo();
  }

}
