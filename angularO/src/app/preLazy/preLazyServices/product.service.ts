import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/apiUrls/apiUrls';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(
    private apiUrls: ApiUrls,
    private http: HttpClient
  ) { }

  getProductById(data) {
    const objectData = { productId : data};
    return this.http.post(this.apiUrls.productByIdUrl, objectData);
  }
  
  getAllProducts() {
    return this.http.get(this.apiUrls.allProductsUrl);
  }
}
