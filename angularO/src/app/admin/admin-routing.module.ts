import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AssignDeliveryComponent } from './assign-delivery/assign-delivery.component';
import { DeliveryBoyListComponent } from './delivery-boy-list/delivery-boy-list.component';

const routes: Routes = [
    {
      path : '',
      component : AdminHomeComponent
    },
    { path: 'delivery-boy-list',
      component : DeliveryBoyListComponent
    },
    { path: 'all-orders',
      component : AllOrdersComponent
    },
    {
      path: ':deliveryBoyId',
      component : AssignDeliveryComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
