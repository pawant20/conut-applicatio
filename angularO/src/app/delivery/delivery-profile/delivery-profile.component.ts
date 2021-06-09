import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryService } from '../deliveryServices/delivery.service'; 
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-delivery-profile',
  templateUrl: './delivery-profile.component.html',
  styleUrls: ['./delivery-profile.component.scss']
})
export class DeliveryProfileComponent implements OnInit {
  userInfo;
  constructor(
    private deliveryService: DeliveryService,
    private loginRegister: LoginRegisterService,
    private router: Router
  ) { }

  deliveryProfileFrom = new FormGroup({
    address1 : new FormControl('', [
      Validators.required
    ]),
    city : new FormControl('', [
      Validators.required,
    ]),
    zip : new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  deliveryProfileData(){
    console.log(this.deliveryProfileFrom.value);
    this.deliveryService.createProfile(this.deliveryProfileFrom.value).subscribe(
      data => {
        this.router.navigate(['/delivery']);
      },
      (error: Response) => {
        console.log(error);
      }
    );
  }

  getUserInfo = () => {
    this.loginRegister.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
      },
      (error: Response) => {
        console.log('unable to get user Info');
      }
    );
  }

  ngOnInit() {
    this.getUserInfo()
  }

}
