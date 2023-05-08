import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Offer } from '../../common/model/offer';
import { ErrorService } from '../../common/service/error.service';

const offerUrl = 'http://localhost:8040/api/offers/';
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
}
