import { NgModule } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRadioModule } from '@angular/material/radio';

const materialComponent = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDividerModule,
  OverlayModule,
  MatRadioModule
];

@NgModule({
  declarations: [],
  imports: [
    materialComponent
  ],
  exports: [
    materialComponent
  ]
})
export class MaterialModule { }
