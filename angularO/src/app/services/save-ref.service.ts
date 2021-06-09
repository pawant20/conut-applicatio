import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../apiUrls/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class SaveRefService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrls
  ) { }

  genRefId = () => {
    return this.http.get(this.apiUrl.generateRefId);
  }
}
