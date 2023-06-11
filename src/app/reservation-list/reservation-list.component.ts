import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from '../common/model/reservation';
import { ReservationService } from './service/reservation.service';
import { Router } from '@angular/router';
import { NewReservationDialog } from '../common/component/new-reservation-dialog/new-reservation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../common/service/auth.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit, OnDestroy {
  reservations: Reservation[] | undefined;
  loaded: boolean = false;
  length: number = 0;
  private pageUrl!: string;
  private subscription!: Subscription;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.pageUrl = this.router.url;
    this.authService.postSessionInfo(this.pageUrl);

    this.initReservations();

    this.subscription = timer(0, 2000).subscribe(() => {
      this.backgroundInitReservations();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initReservations(): void {
    this.loaded = false;
    this.reservationService.getUserReservations().subscribe((reservations) => {
      this.reservations = reservations;
      this.loaded = true;
      this.length = reservations.length;
    });
  }

  backgroundInitReservations(): void {
    this.reservationService.getUserReservations().subscribe((reservations) => {
      this.reservations = reservations;
      this.length = reservations.length;
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
