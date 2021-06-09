import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../adminServices/admin.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  @ViewChild('cancelOrderConfirmation', {static : true}) modalReferenceVariable: ElementRef;

  allOrders = null;
  clickedOrderId = null;
  closeResult;

  UpdateOrderStatusMailFailed = false;
  UpdateOrderStatusFailed = false;
  DeliveredOrderStatusFailed = false;
  CancelOrderStatusMailFailed = false;
  loadingSpniner: Boolean = true;

  // order ID & status stored from modal for cancel order confirmation
  modalOrderId;
  modalOrderStatus;

  constructor(
    private modalService: NgbModal,
    private admin: AdminService
  ) { }

  allOrderClick(orderId, orderStatus) {
    this.clickedOrderId = orderId;
    this.loadingSpniner = true;
    console.log(orderId, orderStatus);
    this.admin.updateOrderStatus(orderId, orderStatus).subscribe(
      data => {
        console.log(data);
        this.loadingSpniner = false;
        this.modalOrderId = null;
        this.modalOrderStatus = null;
        if (orderStatus==='canceled') {
          
        }
      },
      (error: Response) => {
        if (error.status == 422) {
          console.log(error);
          this.loadingSpniner = false;
          this.CancelOrderStatusMailFailed = true;
        } else {
          console.log(error);
          this.loadingSpniner = false;
          this.UpdateOrderStatusFailed = true;
        }
        this.modalOrderId = null;
        this.modalOrderStatus = null;
      }
    );
  }

  // to open modal
  open(cancelOrderConfirmation, orderId) {
    this.modalService.open(cancelOrderConfirmation, {ariaLabelledBy: 'modal-basic-title'});
    this.modalOrderId = orderId;
  }

  confirmCancellation() {
    this.modalService.dismissAll();
    this.admin.cancelOrders(this.modalOrderId).subscribe(
      data => {
        console.log(data);
        this.loadingSpniner = false;
        this.modalOrderId = null;
        this.modalOrderStatus = null;
        this.ngOnInit();
      },
      (error: Response) => {
        if (error.status == 422) {
          console.log(error);
          this.loadingSpniner = false;
          this.CancelOrderStatusMailFailed = true;
        } else {
          console.log(error);
          this.loadingSpniner = false;
          this.UpdateOrderStatusFailed = true;
        }
        this.modalOrderId = null;
        this.modalOrderStatus = null;
      }
    )
  }

  ngOnInit() {
    this.admin.getAllorders().subscribe(
      (data) => {
        console.log('in all orders');
        console.log(data);
        this.allOrders = data;
        this.loadingSpniner = false;
      },
      (error: Response) => {
        console.log(error);
      }
    );
  }

}
