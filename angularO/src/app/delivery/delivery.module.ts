import { NgModule } from '@angular/core';

import { MaterialModule } from '../sharedModule/material.module';
import { SharedModule } from '../sharedModule/shared.module';
import { AgmCoreModule } from '@agm/core';

import { DeliveryRoutingModule } from './delivery-routing.module';

import { DeliveryService } from './deliveryServices/delivery.service';
import { DeliveryProfileComponent } from './delivery-profile/delivery-profile.component';
import { DeliveryHomeComponent } from './delivery-home/delivery-home.component';

@NgModule({
  declarations: [DeliveryProfileComponent, DeliveryHomeComponent],
  imports: [
    SharedModule,
    MaterialModule,
    DeliveryRoutingModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyAq4S6PcTl6rynGm8i0Cleh9A0nUIy57eI',
      libraries : ['places', 'geometry']
    })
  ],
  providers: [DeliveryService]
})
export class DeliveryModule { }
