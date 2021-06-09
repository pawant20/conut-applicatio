import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../preLazyServices/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  myOrder = null;
  constructor(
    private order: OrdersService,
    private router: Router
  ) { }

  orderId(orderid) {
    this.router.navigate(['pre/my-orders', orderid]);
  }

  // passing orderid and ownerID to ensure that only order created by user is deleted
  // not someone elses order
  cancleOrder = (orderId, ownerId) => {
    const datas = {
      orderId,
      ownerId
    };

    this.order.cancleOrder(datas).subscribe(
      data => {
        console.log('order cancelled' + data);
      },
      (error: Response) => {
        console.log('order cancelation error' + error);
      }
    );
  }


  ngOnInit() {
    this.order.myOrders().subscribe(
      data => {
        this.myOrder = data;
      },
      (error: Response) => {
        console.log('couldnt load orders' + error);
      }
    );
  }
}
