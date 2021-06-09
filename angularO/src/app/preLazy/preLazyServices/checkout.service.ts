import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/apiUrls/apiUrls';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CheckoutService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls
  ) { }

  createOrder(data) {
    return this.http.post(this.apiUrls.createOrderUrl, data);
  }

  bonusCalc = (category, deliveryPlan, subscriptionDuration, refCode) => {
    const data = {
      category,
      deliveryPlan,
      subscriptionDuration,
      refCode
    };
    return this.http.post(this.apiUrls.bonusCoconutCalcUrl, data);
  }

  saveRefReward = (referalId, refOwnerId, subscriptionDuration) => {
    const data = {
      referalId,
      refOwnerId,
      subscriptionDuration
    };
    return this.http.post(this.apiUrls.saveRefRewardsUrl, data);
  }

  getRefInfo = () => {
    return this.http.get(this.apiUrls.getRefInfoUrl);
  }

}
