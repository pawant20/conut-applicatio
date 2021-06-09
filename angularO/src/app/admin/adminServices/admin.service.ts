import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../../apiUrls/apiUrls';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls
  ) { }

  unAssignedDeliveries() {
    return this.http.get(this.apiUrls.unAssignedOrdersUrl);
  }
  assignedDeliveries(delBoyId) {
    const data = { delBoyId };
    return this.http.post(this.apiUrls.assignedOrdersUrl, data);
  }

  allDelBoy() {
    return this.http.get(this.apiUrls.allDelBoyUrl);
  }

  manageDelAssignment(data) {
    return this.http.post(this.apiUrls.manageDeliveryAssignmentUrl, data);
  }

  cancelOrders = (orderId) => {
    const data = { orderId }
    return this.http.post(this.apiUrls.cancelOrderAdminUrl, data);
  }

  getAllorders() {
    return this.http.get(this.apiUrls.getAllOrdersUrl);
  }
  updateOrderStatus(orderId, orderStatus) {
    const data = {
      orderId,
      orderStatus
    };
    return this.http.post(this.apiUrls.updateOrderStatusUrl, data);
  }
}
