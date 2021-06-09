import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../apiUrls/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class LazyRefServiceService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrls
  ) { }

  saveRefS = (useReferalId) => {
    const data = {
      useReferalId
    };
    return this.http.post(this.apiUrl.saveRefUrl, data);
  }
}
