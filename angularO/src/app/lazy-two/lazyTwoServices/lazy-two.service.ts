import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/apiUrls/apiUrls';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LazyTwoService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls
  ) { }

  contactUSForm(data) {
    console.log('from service', data);
    return this.http.post(this.apiUrls.contactUsDataUrl, data);
  }

  // used in profile
  getMyRefdata = () => {
    return this.http.get(this.apiUrls.myReferalDataUrl);
  }
}
