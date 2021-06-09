import { Component, OnInit } from '@angular/core';
import { completeUrl } from '../../../angularUrl/angularUrl';

@Component({
  selector: 'app-order-failed',
  templateUrl: './order-failed.component.html',
  styleUrls: ['./order-failed.component.scss']
})
export class OrderFailedComponent implements OnInit {
  home: string;

  constructor() { }

  initUrl = () => {
    this.home = completeUrl.home;
  }
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.initUrl();
  }

}
