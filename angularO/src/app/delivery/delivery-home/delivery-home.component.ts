import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../deliveryServices/delivery.service';
import * as moment from 'moment';

@Component({
  selector: 'app-delivery-home',
  templateUrl: './delivery-home.component.html',
  styleUrls: ['./delivery-home.component.scss']
})
export class DeliveryHomeComponent implements OnInit {

  recievedData;
  isProfileButton:Boolean;
  deliveryProfileId;
  assignedDeliveriesList = [];
  unFilteredDeliveriesList;
  datefromat = 'YYYY-MM-DD';
  todayDate = moment().format(this.datefromat);
  allUserMap = false;

  // used to disable future delivery Button and date selector button
  isToday: boolean;

  // to check if delivery is done on that day or not
  // if yes then delivery button will be hidden and tick button will appear
  deliveryCheckDate;

  // this array is to temperarily store array data of delivered dates with orderID 
  // when del boy successfully deliver it the main purpose is to dynamically
  // show delivered tick mark in UI
  tempDelivered = [];

  tommorrowDate = moment().add(1, 'day').format(this.datefromat);

  // to plot users on map 
  mapConfig = {
    lat : 19.286982921516454,
    lng: 72.8644359418573,
    zoom: 13,
    markers: [
    ]
  };

  constructor(
    private router: Router,
    private delivery: DeliveryService
  ) { }

  plotAllusersMap = () => {
    this.allUserMap = true;
    this.assignedDeliveriesList.forEach(user => {
        this.mapConfig.markers.push({
          lat : user.location.lat,
          lng : user.location.lng,
          label : user.name
        });
    });
  }

  mapNavigate = (lat,lng) => {
    const url = `https://maps.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  }

  createRoute = () => {
    this.router.navigate(['/delivery/create-profile']);
  }

  todayDateDelivery = () => {
    // used to disable future delivery Button and date selector button
    this.isToday = true;
    this.assignedDeliveriesM(this.todayDate);
  }

  tomorrowDateDelivery = () => {
    // used to disable future delivery Button and date selector button
    this.isToday = false;
    this.assignedDeliveriesM(this.tommorrowDate);
  }

  // this array is to temperarily store array data of delivered dates with orderID 
  // when del boy suucessfully deliver it the main purpose is to dynamically
  // show delivered tick mark in UI
  savetempDeliveries = (orderId, delDate) => {
    this.tempDelivered.push({orderId, delDate});
  }

  isDeliveredToday = (orderid, array) => {
    for (const i of array) {
      if (moment(i).format(this.datefromat) == this.deliveryCheckDate) {
        return true;
      }
    }
    if (this.tempDelivered.length > 0) {
      for (const i of this.tempDelivered) {
        if (i.orderId == orderid && i.delDate == this.deliveryCheckDate) {
          return true;
        }
      }
    }
    return false;
  }

  isFutureDeliveries = () => {
    // if()
  }

  delivered = (orderId) => {
    // date to prevent submission of future deliveries
    this.delivery.orderDeliverd(orderId, this.deliveryCheckDate).subscribe(
      data => {
        this.savetempDeliveries(orderId, this.deliveryCheckDate);
      },
      (error: Response) => {
        console.log(error);
      }
    );
  }

  filterDeliveries = (data, passedDate) => {
    this.assignedDeliveriesList = [];
    outer: for (const i of data) {
      for (const j of i.skippedDates) {
        const skipDate = moment(j).format(this.datefromat);
        if (skipDate == passedDate) {
          continue outer;
        }
      }
      this.assignedDeliveriesList.push(i);
    }

    // after list of users are stored in assignedDeliveriesList we will plot map
    this.plotAllusersMap();
  }

  assignedDeliveriesM = async (date) => {
    // to check if delivery is done on that day or not
    // if yes then delivery button will hide and tick button will appear
    this.deliveryCheckDate = date;
    const promise = this.delivery.assignedDeliveries(this.deliveryProfileId, date).toPromise();
    await promise.then(
      result => {
        this.unFilteredDeliveriesList = result;
      }
    ).catch(
      (error: Response) => {
        console.log(error);
      }
    );
    this.filterDeliveries(this.unFilteredDeliveriesList, date);
  }


  ngOnInit() {
     /**
      * Here we are checking if delivery boy has created the profile
      * if profile is created then we will hide create profile button and assign
      * the delprofileId and request for list of deliveries
      * else we will show create profile button
      */
    this.delivery.isProfileExist().subscribe(
      data => {
        this.recievedData = data;
        if (this.recievedData.isProfile) {
          this.isProfileButton = false;
          this.deliveryProfileId = this.recievedData.delProfileId;
          // to get list of assigned deliveries
          // used to disable future delivery Button and date selector button
          this.isToday = true;
          this.assignedDeliveriesM(this.todayDate);
        } else {
          this.isProfileButton = true;
        }
      },
      (error: Response) => {
        this.isProfileButton = false;
      }
    );
  }

}
