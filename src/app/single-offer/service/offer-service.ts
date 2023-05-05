import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../../common/model/offer';

const offerUrl = 'http://localhost:8010/api/offer/get/';
@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient) {}

  getOfferInfo(offerId: string | null): Observable<Offer> {
    return this.http.get<Offer>(offerUrl + offerId);
  }
}
