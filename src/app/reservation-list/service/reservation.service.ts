import { Injectable } from '@angular/core';
import { Reservation } from '../../common/model/reservation';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const reservationUrl = 'http://localhost:5000/api/reservation/list';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  getUserReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(reservationUrl);
  }
}
