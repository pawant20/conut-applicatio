import { NgModule } from '@angular/core';

import { SharedModule } from '../sharedModule/shared.module';
import { LazyTwoRoutingModule } from './lazyTwo-routing.module';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../sharedModule/material.module';
import { LazyTwoService } from './lazyTwoServices/lazy-two.service';

@NgModule({
  declarations: [
    ContactUsComponent,
    AboutUsComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    LazyTwoRoutingModule
  ],
  providers: [
    LazyTwoService
  ]
})
export class LazyTwoModule { }
