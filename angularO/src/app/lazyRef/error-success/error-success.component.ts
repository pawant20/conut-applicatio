import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-success',
  templateUrl: './error-success.component.html',
  styleUrls: ['./error-success.component.scss']
})
export class ErrorSuccessComponent implements OnInit {
  hideAlert = false;
// input dattype {type==error|success,message}
  @Input() data: Data;
  constructor() { }

  ngOnInit() {
    console.log('data from error-suc-component', this.data);
  }
}
export interface Data {
  type?: string;
  message?: string;
}
