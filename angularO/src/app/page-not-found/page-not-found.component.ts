import { Component, OnInit } from '@angular/core';
import { completeUrl } from '../angularUrl/angularUrl';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  homeUrl: string;

  constructor() { }

  initUrl = () => {
    this.homeUrl = completeUrl.home;
  }
  ngOnInit() {
    this.initUrl();
  }

}
