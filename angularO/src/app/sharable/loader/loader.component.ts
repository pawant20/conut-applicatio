import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  // input -> {small,full}
  @Input() data: Data;
  constructor() { }

  ngOnInit(): void {
  }

}
export interface Data {
  type?: string;
}
