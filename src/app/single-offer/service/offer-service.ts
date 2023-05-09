import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Offer } from '../model/offer';
import { ErrorService } from '../../common/service/error.service';
import { environment } from '../../../environments/environment';
import { Price } from '../../common/model/price';

let apiUrl = environment.API_URL;
const offerUrl = apiUrl + 'api/offers/';
const getPriceUrl = apiUrl + 'api/offers/price/';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getOfferInfo(offerId: string | null): Observable<Offer> {
    return this.http.get<Offer>(offerUrl + offerId).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }

  getOfferPrice(
    offerId: string | null | undefined,
    kids: number,
    adults: number
  ): Observable<Price> {
    return this.http
      .get<Price>(
        getPriceUrl +
          offerId +
          '?kids_up_to_3=' +
          kids +
          '&kids_up_to_10=' +
          adults
      )
      .pipe(
        catchError((error) => {
          return this.errorService.errorCatcher(error);
        })
      );
  }
}
