import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../preLazyServices/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderData: OrderDetails = null;
  orderId = null;

  constructor(
    private route: ActivatedRoute,
    private order: OrdersService
  ) { }

  viewCalendarUi = () => {
    this.orderData.editCalendar = false;
    this.orderData.calendarView = true;
  }

  editCalendarUi = () => {
    this.orderData.editCalendar = true;
    this.orderData.calendarView = true;
  }

  getOrdersDetails = async () => {
    const promise = this.order.specificOrders(this.orderId).toPromise();
    await promise.then(
      (data) => {
        this.orderData = data;
        this.orderData.editCalendar = false;
        this.orderData.calendarView = false;
      }
    ).catch((error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('orderid');
    this.getOrdersDetails();
  }

}

// move all interfaces in seperate folder to keep things organised
export interface OrderDetails {
  name?: string;
  mobile?: string;
  email?: string;
  address1?: string;
  landmark?: string;
  zip?: string;
  additionalNote?: string;
  productName?: string;
  price?: string;
  city?: string;
  orderStatus?: string;
  deliveryTime?: string;
  productId?: string;
  subscriptionDuration?: number;
  category?: string;
  shortDescription: string;
  image: string;
  quantityLeft?: number;
  bounusLeft?: number;
  startDate?: string;
  skippedDates?: string[];
  deliverdDates?: string[];
  deliveryBoy?: string;
  createdAt?: string;
  address2?: string;
  editCalendar?: boolean;
  calendarView?: boolean;
}
