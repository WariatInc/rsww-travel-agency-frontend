import { Component, OnInit } from '@angular/core';
import { Reservation } from '../common/model/reservation';
import { ReservationService } from './service/reservation.service';
import { Router } from '@angular/router';
import { NewReservationDialog } from '../common/component/new-reservation-dialog/new-reservation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationListResponse } from '../common/model/reservation-list-response';

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
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.initReservations();
  }

  initReservations(): void {
    this.loaded = false;
    this.reservationService.getUserReservations().subscribe((reservations) => {
      this.reservations = reservations;
      this.loaded = true;
    });
  }

  navigateToReservation(id: string, offerId: string) {
    this.router.navigate(['offer/' + offerId + '/reservation/' + id]);
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.loaded = false;
      this.initReservations();
    });
  }

  payForReservation(id: string) {
    this.dialog.open(NewReservationDialog, {
      data: { id: id, isReserved: true },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.initReservations();
    });
  }
}
