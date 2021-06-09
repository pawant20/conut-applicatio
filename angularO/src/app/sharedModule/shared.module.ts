import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

const sharedModules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbModalModule
];

// these component should should not be imported again in any module where
const sharedComponents = [];

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
export class SharedModule { }
