import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/apiUrls/apiUrls';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../order-details/order-details.component';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls
  ) { }

  myOrders(): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(this.apiUrls.getMyOrdersUrl);
  }

  specificOrders = (data): Observable<OrderDetails>  => {
    const objectId = {data};
    return this.http.post<OrderDetails>(this.apiUrls.specificOrderUrl, objectId);
  }

  cancleOrder(data) {
    return this.http.delete(`${this.apiUrls.cancleOrderUrl}/${data.orderId}/${data.ownerId}`);
  }

  orderConfirmationMail(data) {
    return this.http.post(this.apiUrls.orderConfirmationMailUrl, data);
  }

  renewOrderInfo = (orderId) => {
    const data = { orderId };
    return this.http.post(this.apiUrls.renewOrderUrl, data);
  }

  renewOrder = (orderId) => {
    const data = { orderId };
    return this.http.post(this.apiUrls.renewOrderUrl, data);
  }

  saveSkipped(data) {
    return this.http.post(this.apiUrls.skippedArrayUrl, data);
  }
}
