import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiUrls } from '../../apiUrls/apiUrls';

@Injectable()
export class DeliveryService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls
  ) { }
  createProfile(data) {
    return this.http.post(this.apiUrls.createDeliveryProfileUrl, data);
  }
  isProfileExist(){
    return this.http.get(this.apiUrls.isProfileExistUrl);
  }
  assignedDeliveries(data, date){
    const dataObj = {
      delBoyId : data,
      date
    };
    return this.http.post(this.apiUrls.assignedDeliveryList, dataObj);
  }
  orderDeliverd = (data, date) => {
    const obj = { 
      orderId : data,
      date
    };
    return this.http.post(this.apiUrls.orderDeliveredUrl, obj);
  }
}
