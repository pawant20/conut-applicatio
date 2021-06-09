import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryProfileComponent } from './delivery-profile/delivery-profile.component';
import { DeliveryHomeComponent } from './delivery-home/delivery-home.component';

const routes: Routes = [
      {
        path: '',
        component :  DeliveryHomeComponent
      },
      {
        path: 'create-profile',
        component :  DeliveryProfileComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
