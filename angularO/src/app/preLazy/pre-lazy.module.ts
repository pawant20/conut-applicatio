import { NgModule } from '@angular/core';

// Here we are not importing shared module because module is already imported in shared module
import { SharedModule } from '../sharedModule/shared.module';
import { MaterialModule } from '../sharedModule/material.module';

import { OrderDetailsComponent } from '../preLazy/order-details/order-details.component';
import { PreLazyRoutingModule } from './preLazy-routing.module';
import { OrderCalendarComponent } from './order-details/order-calendar/order-calendar.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { OrdersService } from './preLazyServices/orders.service';
import { CheckoutService } from './preLazyServices/checkout.service';
import { ProductService } from './preLazyServices/product.service';
import { OrderSuccessComponent } from './checkout/order-success/order-success.component';
import { OrderFailedComponent } from './checkout/order-failed/order-failed.component';


@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrderCalendarComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    OrdersComponent,
    ProductPageComponent,
    OrderSuccessComponent,
    OrderFailedComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    PreLazyRoutingModule,
    AgmCoreModule.forRoot({
      apiKey : environment.googleApi,
      libraries : ['places', 'geometry']
    }),
  ],
  providers: [
    OrdersService,
    CheckoutService,
    ProductService
  ]
})
export class PreLazyModule { }
