import { Component, OnInit } from '@angular/core';
import { adminUrl } from '../../angularUrl/angularUrl';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  allOrder = adminUrl.allOrder
  delBoyList = adminUrl.delBoyList
  
  constructor() { }

  ngOnInit(): void {
  }

}
