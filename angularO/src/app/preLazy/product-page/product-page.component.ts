import { Component, OnInit } from '@angular/core';
// import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ProductService } from '../preLazyServices/product.service';
import { completeUrl } from '../../angularUrl/angularUrl';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],

})
export class ProductPageComponent implements OnInit {

  coconutCategoryOptions: string[] = ['water', 'pulp'];
  quantity = 1;
  selectedCoconut = this.coconutCategoryOptions[0];
  allProducts = null;
  filteredProducts = [];
  productToNavigate;

  productsToDisplay = [];

  initailPrice = 0;

  category = null;
  subscriptionDuration: Number = null;

  constructor(
    private product: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // display categorised product based on price
  // here this function will return distinct product based on price,category
  prodToDisplay(perPeice, coconutCategory, filteredArray) {
    const tempArray = [];
    const map = new Map();
    for (const product of filteredArray) {
      if (!map.has(product[perPeice]) && !map.has(product[coconutCategory])) {
          map.set(product[perPeice], true);
          tempArray.push(product);
      }
    }
    return tempArray;
  }

  prodToNavigate(route,product){
    for (const i of this.filteredProducts) {
      if(product.perPeice == i.perPeice && this.selectedCoconut == i.coconutCategory){
        this.productToNavigate = i;
      }
    }
    this.router.navigate([route, this.productToNavigate._id, this.quantity]);
  }

  increaseQty = () => {
    if (this.quantity > 14) {
      return;
    }
    this.quantity++;
    this.productsToDisplay[0].price = this.productsToDisplay[0].price + this.initailPrice;
  }

  decreaseQty = () => {
    if (this.quantity >= 2) {
      this.quantity--;
      this.productsToDisplay[0].price = this.productsToDisplay[0].price - this.initailPrice;
    }
  }

  selectedProduct(product) {
    this.prodToNavigate(completeUrl.prodDetail, product);
  }

  order(product) {
    this.prodToNavigate(completeUrl.checkout, product);
  }

  filterProducts(subscriptionDuration: Number) {
      for (const product of this.allProducts) {
        if ( product.subscriptionDuration === subscriptionDuration) {
          this.filteredProducts.push(product);
        }
      }
      this.productsToDisplay = this.prodToDisplay('perPeice', 'water', this.filteredProducts);
      // assigning initial price to calculate price when qty is incremented or decremented
      this.initailPrice = this.productsToDisplay[0].price;
  }

  ngOnInit() {
    // we are using json parse as it will return boolean/number value instead of String
    this.category = this.route.snapshot.queryParamMap.get('category');
    if (this.category === 'coconut') {
      this.subscriptionDuration = JSON.parse(this.route.snapshot.queryParamMap.get('subscriptionDuration'));
      this.product.getAllProducts().subscribe(
        data => {
          this.allProducts = data;
          this.filterProducts(this.subscriptionDuration);
        },
        (error: Response) => {
          console.log(error);
        }
      );
      return;
    }
  }

}
