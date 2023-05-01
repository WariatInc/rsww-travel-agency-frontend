import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../../common/model/offer';

const offerUrl = 'http://localhost:5000/api/offer/';
@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient) {}

  getOfferInfo(offerId: number): Observable<Offer> {
    return this.http.get<Offer>(offerUrl + offerId);
  }
}
