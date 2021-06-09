import { NgModule } from '@angular/core';

import { SharedModule } from '../sharedModule/shared.module';
import { MaterialModule } from '../sharedModule/material.module';
import { LazyLoadRoutingModule } from './lazyLoad-routing.module';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetSuccessComponent } from './reset-password/reset-success/reset-success.component';
import { ResetFailedComponent } from './reset-password/reset-failed/reset-failed.component';
// import { PasswordFailedComponent } from './reset-password/password-failed/password-failed.component';
// import { PasswordSuccessComponent } from './reset-password/password-success/password-success.component';

@NgModule({
  declarations: [
    // PasswordFailedComponent,
    // PasswordSuccessComponent,
    ResetPasswordComponent,
    ResetSuccessComponent,
    ResetFailedComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    LazyLoadRoutingModule
  ]
})
export class LazyLoadModule { }
