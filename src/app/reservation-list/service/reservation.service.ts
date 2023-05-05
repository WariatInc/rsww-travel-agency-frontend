import { Injectable } from '@angular/core';
import { Reservation } from '../../common/model/reservation';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../common/service/auth.service';
import { MakeReservationResponse } from '../../common/model/make-reservation-response';
import { PaymentResponse } from '../../common/model/payment-response';
import { ReservationListResponse } from '../../common/model/reservation-list-response';

const reservationUrl = 'http://localhost:8000/api/reservations/';
const reservationCancelUrl = 'http://localhost:8000/api/reservations/cancel/';
const reservationPaymentUrl = 'http://localhost:8030/api/payment/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserReservations(): Observable<ReservationListResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };
    return this.http.get<ReservationListResponse>(reservationUrl, options);
  }

  cancelReservation(id: string | null | undefined): Observable<Reservation> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    return this.http.post<Reservation>(
      reservationCancelUrl + id,
      null,
      options
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

    return this.http.post<PaymentResponse>(
      reservationPaymentUrl,
      { item_id: id },
      options
    );
  }

  makeReservation(id: string): Observable<MakeReservationResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };

    return this.http.post<MakeReservationResponse>(
      reservationUrl,
      { offer_id: id },
      options
    );
  }
}
