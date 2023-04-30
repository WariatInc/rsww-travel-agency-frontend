import { Component, OnInit } from '@angular/core';
import { Reservation } from '../common/model/reservation';
import { ReservationService } from './service/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] | undefined;

  constructor(private reservationService: ReservationService) {}
  ngOnInit(): void {
    this.reservationService.getUserReservations().subscribe((reservations) => {
      this.reservations = reservations;
    });
  }
}
