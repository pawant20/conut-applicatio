import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlreadyLoggedInGaurdsService } from '../route-gaurds/already-logged-in-gaurds.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
      {
        path: 'reset-password/:token',
        component : ResetPasswordComponent ,
        canActivate: [AlreadyLoggedInGaurdsService]
      } 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyLoadRoutingModule { }
