import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorSuccessAlertComponent } from '../sharable/error-success-alert/error-success-alert.component';
import { LoaderComponent } from '../sharable/loader/loader.component';

const sharedModules = [
    CommonModule
];

const sharedComponents = [
  ErrorSuccessAlertComponent,
  LoaderComponent
];

@NgModule({
  declarations: [
    sharedComponents
  ],
  imports: [
    sharedModules
  ],
  exports: [
    sharedModules,
    sharedComponents
  ]
})
export class UxResponse { }
