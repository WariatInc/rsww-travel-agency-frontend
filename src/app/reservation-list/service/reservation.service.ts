import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../common/service/auth.service';
import { MakeReservationResponse } from '../../common/model/make-reservation-response';
import { PaymentResponse } from '../../common/model/payment-response';
import { ReservationListResponse } from '../../common/model/reservation-list-response';
import { ErrorService } from '../../common/service/error.service';
import { Reservation } from '../../common/model/reservation';
import { environment } from '../../../environments/environment';

let apiUrl = environment.API_URL;

const reservationUrl = apiUrl + 'api/reservations/';
const reservationCancelUrl = apiUrl + 'api/reservations/cancel/';
const reservationPaymentUrl = apiUrl + 'api/payment/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  getUserReservations(): Observable<ReservationListResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };
    return this.http.get<ReservationListResponse>(reservationUrl, options).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }

  cancelReservation(id: string | null | undefined): Observable<void> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    return this.http.post<void>(reservationCancelUrl + id, null, options).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }

  payForReservation(
    id: string | null | undefined
  ): Observable<PaymentResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    return this.http
      .post<PaymentResponse>(reservationPaymentUrl, { item_id: id }, options)
      .pipe(
        catchError((error) => {
          return this.errorService.errorCatcher(error);
        })
      );
  }

  makeReservation(
    id: string,
    kidsUpTo3: number,
    kidsUpTo10: number
  ): Observable<MakeReservationResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    if (kidsUpTo3 === null || kidsUpTo3 === undefined || isNaN(kidsUpTo3)) {
      kidsUpTo3 = 0;
    }
    if (kidsUpTo10 === null || kidsUpTo10 === undefined || isNaN(kidsUpTo10)) {
      kidsUpTo10 = 0;
    }

    return this.http
      .post<MakeReservationResponse>(
        reservationUrl,
        { offer_id: id, kids_up_to_3: kidsUpTo3, kids_up_to_10: kidsUpTo10 },
        options
      )
      .pipe(
        catchError((error) => {
          return this.errorService.errorCatcher(error);
        })
      );
  }

  deleteReservation(id: string | null | undefined): Observable<void> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    return this.http.delete<void>(reservationUrl + id, options).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }

  getReservation(id: string | null | undefined): Observable<Reservation> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    return this.http.get<Reservation>(reservationUrl + id, options).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }
}
