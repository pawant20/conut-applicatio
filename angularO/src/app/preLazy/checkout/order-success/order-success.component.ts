import { Component, OnInit } from '@angular/core';
import { completeUrl } from '../../../angularUrl/angularUrl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  myOrder: string;
  home: string;

  constructor(
    private router: Router
  ) { }

  myOrderClick = () => {
    this.router.navigate([this.myOrder]);
  }

  initUrl = () => {
    this.myOrder = completeUrl.myOrders;
    this.home = completeUrl.home;
  }
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.initUrl();
  }

}
