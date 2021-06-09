import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../preLazyServices/product.service';
import { CheckoutService } from '../preLazyServices/checkout.service';
import { LoginRegisterService } from '../../services/login-register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('trialOffer', { static: true }) modalReferenceVariable: ElementRef;

  orderSuccessQty = 0;
  orderLoopCount = 0;
  quantity: number;
  checkoutPrice: number;
  checkoutDuration: number
  productData = null;
  userInfo = null;
  orderData = null;
  bonusQty = null;
  refererInfo = null;
  checkoutUi = true;
  orderSuccessUi = false;
  orderFailedUi = false;
  setLocatioAlert = false;
  secondCheckOutValid = false;

  mapConfig = {
    lat: 19.286982921516454,
    lng: 72.8644359418573,
    zoom: 13,
    location: {
      lat: 0,
      lng: 0
    }
  };

  currentLocationErrorAlert = false;

  constructor(
    private route: ActivatedRoute,
    private product: ProductService,
    private checkout: CheckoutService,
    private loginRegister: LoginRegisterService,
    private modalService: NgbModal
  ) { }

  firstCheckOutForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    address1: new FormControl('', [
      Validators.required
    ]),
    address2: new FormControl(''),
    landmark: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ]),
    additionalNote: new FormControl(''),
    deliveryTime: new FormControl('')
  });
  get name() {
    return this.firstCheckOutForm.get('name');
  }
  get email() {
    return this.firstCheckOutForm.get('email');
  }
  get mobile() {
    return this.firstCheckOutForm.get('mobile');
  }
  get address1() {
    return this.firstCheckOutForm.get('address1');
  }
  get address2() {
    return this.firstCheckOutForm.get('address2');
  }
  get landmark() {
    return this.firstCheckOutForm.get('landmark');
  }
  get zip() {
    return this.firstCheckOutForm.get('zip');
  }
  get city() {
    return this.firstCheckOutForm.get('city');
  }

  secondCheckOutForm = new FormGroup({
    additionalNote: new FormControl(''),
    deliveryTime: new FormControl('', [Validators.required])
  });
  get additionalNote() {
    return this.secondCheckOutForm.get('additionalNote');
  }
  get deliveryTime() {
    return this.secondCheckOutForm.get('deliveryTime');
  }

  // set location on drag
  markerDragEnd = ($event) => {
    this.mapConfig.lat = $event.coords.lat;
    this.mapConfig.lng = $event.coords.lng;
  }

  // set location on click
  clickUpdateMarker = (lat: number, lng: number) => {
    this.mapConfig.location.lat = lat;
    this.mapConfig.location.lng = lng;
  }

  setCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.mapConfig.location.lat = latitude;
        this.mapConfig.location.lng = longitude;

        // to focus on current location
        this.mapConfig.lat = latitude;
        this.mapConfig.lng = longitude;
        this.mapConfig.zoom = 15;
      });
    } else {
      alert('Geolocation is not supported by this browser, please use google chrome or set location manually');
      this.currentLocationErrorAlert = true;
    }
  }
  // !map

  initialCheckout() {
    if (this.firstCheckOutForm.invalid) {
      return;
    }
  }

  secondformCheckout() {
    if (this.secondCheckOutForm.invalid) {
      return;
    }

    this.secondCheckOutValid = true;
    this.orderData = {
      ...this.firstCheckOutForm.value,
      ...this.secondCheckOutForm.value,

      // product Detail
      productName: this.productData.name,
      price: this.productData.price,
      productId: this.productData._id,
      subscriptionDuration: this.productData.subscriptionDuration,
      category: this.productData.category,
      type: this.productData.type,
      image: this.productData.image,
      shortDescription: this.productData.shortDescription,
      bounusLeft: this.bonusQty.bonusQuantity,
      location: this.mapConfig.location
    };
  }

  orderLoop = async () => {
    for (let i = 0; i < this.quantity; i++) {
      const promiseA = this.checkout.createOrder(this.orderData).toPromise();
      await promiseA.then(
        data => {
          this.orderLoopCount++;
        }
      ).catch(
        (error: Response) => {
          console.log(error);
        }
      );
    }
  }

  async finalCheckOut() {

    await this.orderLoop();

    if (this.orderLoopCount === this.quantity) {
      this.updateUserData();
      if (this.refererInfo) {
        this.refRewardSave();
      }

      this.orderSuccessUi = true;
      this.checkoutUi = false;
    } else {
      this.orderFailedUi = true;
      this.checkoutUi = false;
    }
  }

  setUserInfoValue(data) {
    this.name.setValue(data.name),
      this.email.setValue(data.email),
      this.mobile.setValue(data.mobile),
      this.address1.setValue(data.address1),
      this.city.setValue(data.city),
      this.zip.setValue(data.zip),
      this.landmark.setValue(data.landmark);
  }

  calculatePriceOnQty = () => {
    this.checkoutPrice = parseInt(this.productData?.price, 10) * this.quantity;
    this.checkoutDuration = this.productData.subscriptionDuration * this.quantity;
  }

  updateUserData() {
    this.loginRegister.updateUser(this.orderData).subscribe(
      data => {
        console.log(data);
      },
      (error: Response) => {
        console.log(error);
      }
    );
  }

  open(trial) {
    this.modalService.open(trial, { ariaLabelledBy: 'modal-basic-title' });
  }


  calculateBonus = (refCode) => {
    this.checkout.bonusCalc(this.productData.category, this.productData.deliveryPlan, this.productData.subscriptionDuration, refCode).subscribe(
      data => {
        this.bonusQty = { bonusQuantity: 0 };
      }
    );
  }

  refRewardSave = () => {
    // referalId,refOwnerId,refUserID,subscriptionDuration
    this.checkout.saveRefReward(this.refererInfo.referalId, this.refererInfo.refOwnerId, this.productData.subscriptionDuration).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log('ref reward save error ', error);
      }
    );
  }
  /**
   * use promise instead of mergemap anf forkjoin
   */
  getProductInfo = (productId) => {
    this.product.getProductById(productId).pipe(
      map(
        productData => {
          this.productData = productData;
          this.calculatePriceOnQty();
          return this.productData;
        },
        (error: Response) => {
          console.log('product retrival', error);
        }
      ),
      mergeMap(
        prodData => {
          const refInfo = this.checkout.getRefInfo();
          return refInfo;
        }
      )
    ).subscribe(
      data => {
        this.refererInfo = data;
        this.calculateBonus(this.refererInfo.referalId);
      },
      (error: Response) => {
        this.calculateBonus(null);
      }
    );
  }



  /**
   * Here we are fetching product data to identify and store product details in orders
   * model
   */
  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.quantity = parseInt(this.route.snapshot.paramMap.get('qty'), 10);

    this.getProductInfo(productId);

    this.loginRegister.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.setUserInfoValue(this.userInfo);
      },
      (error: Response) => {
        console.log(error.arrayBuffer, 'unable to get user Info');
      }
    );
  }
}
