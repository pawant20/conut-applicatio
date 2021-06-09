import { Component, OnInit } from '@angular/core';
import { AdminService } from '../adminServices/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-delivery',
  templateUrl: './assign-delivery.component.html',
  styleUrls: ['./assign-delivery.component.scss']
})
export class AssignDeliveryComponent implements OnInit {

  isUpdateSuccessfulAlert: Boolean = true;
  updateFailedAlert: Boolean = true;
  delboyId;
  delBoyLists;
  loadingSpniner: Boolean = false;
  unAssignedDeliveriesList;
  assignedDeliveryList;
  addedDeliveryBoy;
  removedDeliveryBoy;
  newUnAssignedDeliveriesList: any[] = [];
  newAssignedDeliveryList: any[] = [];

  constructor(
    private admin: AdminService,
    private route: ActivatedRoute
  ) { }
  
  updateAssignment = () => {
    const assigmnementInfo = {
      delboyId: this.delboyId,
      newAssignedArray: this.newAssignedDeliveryList,
      newUnAssignedArray: this.newUnAssignedDeliveriesList
    };
    console.log('orderDeliveryID', assigmnementInfo);
    this.admin.manageDelAssignment(assigmnementInfo).subscribe(
      data => {
        console.log(data);
        this.isUpdateSuccessfulAlert = false;
      },
      (error: Response) => {
        console.log(error);
        this.updateFailedAlert = false;
      }
    );
  }

  assigning = (order) => {
    this.assignedDeliveryList.push(order);
    this.newAssignedDeliveryList.push(order);
    this.unAssignedDeliveriesList.splice(this.unAssignedDeliveriesList.indexOf(order), 1);
    this.newUnAssignedDeliveriesList.splice(this.newUnAssignedDeliveriesList.indexOf(order), 1);
  }

  unAassigning = (order) => {
    this.unAssignedDeliveriesList.push(order);
    this.newUnAssignedDeliveriesList.push(order);
    this.assignedDeliveryList.splice(this.assignedDeliveryList.indexOf(order), 1);
    this.newAssignedDeliveryList.splice(this.newAssignedDeliveryList.indexOf(order), 1);
  }

  async ngOnInit() {
    this.loadingSpniner = true;
    this.delboyId = this.route.snapshot.paramMap.get('deliveryBoyId');

    this.admin.allDelBoy().subscribe(
      data => {
        this.loadingSpniner = false;
        this.delBoyLists = data;
      },
      (error: Response) => {
        this.loadingSpniner = false;
        console.log(error);
      }
    );

    this.admin.assignedDeliveries(this.delboyId).subscribe(
      data => {
        this.assignedDeliveryList = data;
      },
      (error: Response) => {
        console.log(error);
      }
    )
    this.admin.unAssignedDeliveries().subscribe(
      data => {
        this.unAssignedDeliveriesList = data;
      },
      (error: Response) => {
        console.log(error);
      }
    );
  }
}
