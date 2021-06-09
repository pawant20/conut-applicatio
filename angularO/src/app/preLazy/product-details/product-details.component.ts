import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../preLazyServices/product.service';
import { completeUrl } from '../../angularUrl/angularUrl';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData = null;
  quantity = 1;
  intialPrice;
  constructor(
    private route: ActivatedRoute,
    private product: ProductService,
    private router: Router
  ) { }

  order() {
    this.router.navigate([completeUrl.checkout, this.productData._id, this.quantity]);
  }

  increaseQty = () => {
    if (this.quantity > 14) {
      return;
    }
    this.quantity++;
    this.productData.price = this.productData.price + this.intialPrice;
  }
  decreaseQty = () => {
    if (this.quantity >= 2) {
      this.quantity--;
      this.productData.price = this.productData.price - this.intialPrice;
    }
  }

  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    const promiseD = this.product.getProductById(productId).toPromise();
    await promiseD.then(
      data => {
        this.productData = data;
        this.intialPrice = this.productData.price;
      }
    ).catch(
      (error: Response) => {
        console.log(error);
      }
    );
    this.intialPrice = this.productData.price;
  }
}
