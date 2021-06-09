import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveRefidComponent } from './save-refid/save-refid.component';
import { LazyRefRoutingModule } from './lazy-ref-routing.module';
import { ErrorSuccessComponent } from './error-success/error-success.component';


@NgModule({
  declarations: [
    SaveRefidComponent,
    ErrorSuccessComponent
  ],
  imports: [
    CommonModule,
    LazyRefRoutingModule,
  ]
})
export class LazyRefModule { }
