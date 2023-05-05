import { Component, OnInit } from '@angular/core';
import { Reservation } from '../common/model/reservation';
import { ReservationService } from './service/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] | undefined;
  loaded: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initReservations();
  }

  initReservations(): void {
    this.reservationService.getUserReservations().subscribe((reservations) => {
      this.reservations = reservations.reservations;
      console.log(this.reservations);
      this.loaded = true;
    });
  }

  navigateToReservation(id: string) {
    this.router.navigate(['reservation/' + id]);
  }

  deleteReservation(id: string) {
    this.reservationService.cancelReservation(id).subscribe(() => {
      this.loaded = false;
      this.initReservations();
    });
  }
}
