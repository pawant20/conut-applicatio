import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from '../route-gaurds/auth-gaurd.service';
import { OrderDetailsComponent } from '../preLazy/order-details/order-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { preUrl } from '../angularUrl/angularUrl';

const routes: Routes = [
      {
        path: preUrl.myOrders,
        component : OrdersComponent ,
        canActivate: [AuthGaurdService]
      },
      { path: preUrl.product,
        component : ProductPageComponent
      },
      {
        path: preUrl.product + '/:productId' + '/:qty',
        component : ProductDetailsComponent
      },
      {
        path: preUrl.checkout + '/:productId' + '/:qty',
        component : CheckoutComponent ,
        canActivate: [AuthGaurdService]
      },
      {
        path: preUrl.orderDetails + '/:orderid',
        component : OrderDetailsComponent ,
        canActivate: [AuthGaurdService]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreLazyRoutingModule { }
