import { Component, OnInit } from '@angular/core';
import { AdminService } from '../adminServices/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delivery-boy-list',
  templateUrl: './delivery-boy-list.component.html',
  styleUrls: ['./delivery-boy-list.component.scss']
})
export class DeliveryBoyListComponent implements OnInit {

  isDelListActive:Boolean = false
  delBoyLists;
  loadingSpniner:Boolean = false;
  constructor(
    private admin: AdminService,
    private router: Router
  ) { }

  delBoyList(){
    this.isDelListActive = !this.isDelListActive
    this.loadingSpniner = true;
    this.admin.allDelBoy().subscribe(
      data => {
        this.delBoyLists = data;
        this.loadingSpniner = false;
      },
      (error:Response)=>{
        this.loadingSpniner = false;
      }
    )
  }

  perProf(data){
    this.router.navigate(['admin', data._id]);
  }

  ngOnInit() {
    this.delBoyList()
    this.admin.unAssignedDeliveries().subscribe(
      data => {
        console.log(data);
      },
      (error:Response)=>{
        console.log(error);
      }
    )
  }

}
