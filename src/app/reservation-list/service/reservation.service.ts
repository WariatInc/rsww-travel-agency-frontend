import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../common/service/auth.service';
import { MakeReservationResponse } from '../../common/model/make-reservation-response';
import { PaymentResponse } from '../../common/model/payment-response';
import { ReservationListResponse } from '../../common/model/reservation-list-response';
import { ErrorService } from '../../common/service/error.service';

const reservationUrl = 'http://localhost:8000/api/reservations/';
const reservationCancelUrl = 'http://localhost:8000/api/reservations/cancel/';
const reservationPaymentUrl = 'http://localhost:8030/api/payment/reservation';

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

  makeReservation(id: string): Observable<MakeReservationResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    return this.http
      .post<MakeReservationResponse>(reservationUrl, { offer_id: id }, options)
      .pipe(
        catchError((error) => {
          return this.errorService.errorCatcher(error);
        })
      );
  }
}
