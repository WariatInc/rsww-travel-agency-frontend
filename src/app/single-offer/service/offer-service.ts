import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Offer } from '../model/offer';
import { ErrorService } from '../../common/service/error.service';
import { environment } from '../../../environments/environment';
import { Price } from '../../common/model/price';
import { OffersForTourSearch } from '../model/offers-for-tour-search';
import { VisibilityResponse } from '../../common/model/visibility-response';
import { UrlSegment } from '@angular/router';

let apiUrl = environment.API_URL;
const offerUrl = apiUrl + 'api/offers/';
const tourUrl = apiUrl + 'api/tours/';
const offersForTourSearchUrl = apiUrl + 'api/offers/search?tour_id=';
const getPriceUrl = apiUrl + 'api/offers/price/';
const visibilityUrl = apiUrl + 'api/users/sessions/page?webapp_page=';

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

  getTourInfo(id: string | null): Observable<Offer> {
    return this.http.get<Offer>(tourUrl + id).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }

  getOfferList(
    tourId: string | null | undefined,
    page: string,
    adults: string | undefined,
    kids: string | undefined
  ): Observable<OffersForTourSearch> {
    return this.http
      .get<OffersForTourSearch>(
        offersForTourSearchUrl +
          tourId +
          '&page=' +
          page +
          '&page_size=5' +
          '&adults=' +
          adults +
          '&kids=' +
          kids +
          '&sort_by=price'
      )
      .pipe(
        catchError((error) => {
          return this.errorService.errorCatcher(error);
        })
      );
  }

  getVisibility(pageUrl: string | undefined): Observable<VisibilityResponse> {
    return this.http.get<VisibilityResponse>(visibilityUrl + pageUrl);
  }

  getFilteredOfferList(
    tourId: string | null | undefined,
    page: string,
    roomType: string | null,
    breakfast: boolean | null,
    allInclusive: boolean | null,
    adults: string | undefined,
    kids: string | undefined
  ): Observable<OffersForTourSearch> {
    let url =
      offersForTourSearchUrl +
      tourId +
      '&page=' +
      page +
      '&page_size=5' +
      '&sort_by=price' +
      '&breakfast=' +
      breakfast +
      '&all_inclusive=' +
      allInclusive +
      '&adults=' +
      adults +
      '&kids=' +
      kids;

    if (roomType) {
      url =
        offersForTourSearchUrl +
        tourId +
        '&page=' +
        page +
        '&page_size=5' +
        '&sort_by=price' +
        '&room_type=' +
        roomType +
        '&breakfast=' +
        breakfast +
        '&all_inclusive=' +
        allInclusive +
        '&adults=' +
        adults +
        '&kids=' +
        kids;
    }

    return this.http.get<OffersForTourSearch>(url).pipe(
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
