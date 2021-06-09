import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-success-alert',
  templateUrl: './error-success-alert.component.html',
  styleUrls: ['./error-success-alert.component.scss']
})
export class ErrorSuccessAlertComponent implements OnInit {
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
