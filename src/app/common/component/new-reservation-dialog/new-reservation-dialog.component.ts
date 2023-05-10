import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService } from '../../../reservation-list/service/reservation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'new-reservation-dialog',
  templateUrl: 'new-reservation-dialog.component.html',
  styleUrls: ['new-reservation-dialog.component.css'],
})
export class NewReservationDialog implements OnInit {
  paymentLoading: boolean = false;
  public paymentState: string = 'BRAK';

  public reservationMade: boolean = false;
  private reservationId!: string;
  public paymentMade: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string; isReserved: boolean },
    private reservationService: ReservationService,
    private router: Router,
    private authUser: AuthService
  ) {}

  ngOnInit() {
    if (this.data.isReserved) {
      this.reservationId = this.data.id;
    }
    console.log(this.data.isReserved);
  }

  makePayment(): void {
    this.paymentLoading = true;
    this.paymentState = 'CZEKANIE';
    this.reservationService
      .payForReservation(this.reservationId)
      .subscribe((response) => {
        this.paymentLoading = false;
        this.paymentMade = true;
        if (response.result == 'finalized') {
          this.paymentState = 'ZAAKCEPTOWANA';
        } else {
          this.paymentState = 'ODRZUCONA';
        }
      });
  }

  // makeReservation(): void {
  //   const func = (): void => {
  //     this.reservationService
  //       .makeReservation(this.data.id)
  //       .subscribe((response) => {
  //         this.reservationMade = true;
  //         this.reservationId = response.reservation_id;
  //       });
  //   };
  //   this.authUser.doIfUserLoggedIn(func);
  // }

  closeDialog(): void {
    if (this.paymentState == 'ZAAKCEPTOWANA') {
      this.router.navigate(['reservation/' + this.data.id]);
    }
  }
}
