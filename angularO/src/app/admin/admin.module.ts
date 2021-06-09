import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../sharedModule/material.module';
import { SharedModule } from '../sharedModule/shared.module';
import { AdminService } from './adminServices/admin.service';

import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AssignDeliveryComponent } from './assign-delivery/assign-delivery.component';
import { DeliveryBoyListComponent } from './delivery-boy-list/delivery-boy-list.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
  declarations: [
    AllOrdersComponent,
    AssignDeliveryComponent,
    DeliveryBoyListComponent,
    AdminHomeComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    AdminRoutingModule
  ],
  providers: [AdminService]
})
export class AdminModule { }
