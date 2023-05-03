import { Injectable } from '@angular/core';
import { Reservation } from '../../common/model/reservation';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const reservationUrl = 'http://localhost:5000/api/reservation/list';
const reservationCancelUrl = 'http://localhost:5000/api/reservation/cancel/';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  getUserReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(reservationUrl);
  }

  cancelReservation(id: string | null | undefined): Observable<Reservation> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'username..',
    });
    let options = { headers: headers };

    return this.http.post<Reservation>(
      reservationCancelUrl + id,
      null,
      options
    );
  }
}
