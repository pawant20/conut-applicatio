import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthGaurdService } from '../route-gaurds/auth-gaurd.service';
import { lazyTwoUrl } from '../angularUrl/angularUrl';

const routes: Routes = [
      {
        path: lazyTwoUrl.about,
        component : AboutUsComponent
      },
      {
        path: lazyTwoUrl.contactUs,
        component : ContactUsComponent
      },
      {
        path: lazyTwoUrl.profile,
        component : ProfileComponent ,
        canActivate: [AuthGaurdService]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyTwoRoutingModule { }
