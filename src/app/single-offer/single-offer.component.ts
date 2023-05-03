import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from './service/offer-service';
import { Offer } from '../common/model/offer';
import { CancelDialogComponent } from '../common/component/cancel-dialog/cancel-dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReservationService } from '../reservation-list/service/reservation.service';
import { Reservation } from '../common/model/reservation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
})
export class SingleOfferComponent implements OnInit {
  private offerId: string | null | undefined;
  public offer!: Offer;
  public loadingOfferInfo: boolean = true;
  public isOffer: boolean = true;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private reservationService: ReservationService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    if (this.router.url.includes('reservation')) {
      this.isOffer = false;
    }

    this.offerId = this.route.snapshot.paramMap.get('id');
    this.offerService.getOfferInfo(this.offerId).subscribe((offer) => {
      this.offer = offer;
      this.loadingOfferInfo = false;
    });
  }

  doCancelReservation(): void {
    const dialogRef = this.dialog.open(CancelDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reservationService
          .cancelReservation(this.offerId)
          .subscribe((reservation: Reservation) => {
            if (reservation.state === 'canceled') {
              this._snackBar.open('Odwołano rezerwację', 'OK');
              this.router.navigate(['offer/' + this.offerId]);
            } else {
              this._snackBar.open('Błąd przy odwoływaniu rezerwacji', 'OK');
            }
          });
      }
    });
  }

  makeNewReservation(): void {
    const dialogRef = this.dialog.open(NewReservationDialog, {
      disableClose: true,
      height: '40%',
      data: { id: this.offerId },
    });
  }
}

@Component({
  selector: 'new-reservation-dialog',
  templateUrl: 'new-reservation-dialog.html',
  styleUrls: ['single-offer.component.css'],
})
export class NewReservationDialog {
  paymentLoading: boolean = false;
  public paymentState: string = 'BRAK';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private reservationService: ReservationService,
    private router: Router
  ) {}

  makePayment(): void {
    this.paymentLoading = true;
    this.paymentState = 'CZEKANIE';
    this.reservationService
      .payForReservation(this.data.id)
      .subscribe((response) => {
        this.paymentLoading = false;
        if (response == 'finalized') {
          this.paymentState = 'ZAAKCEPTOWANA';
        } else {
          this.paymentState = 'ODRZUCONA';
        }
      });
  }

  closeDialog(): void {
    if (this.paymentState == 'ZAAKCEPTOWANA') {
      this.router.navigate(['reservation/' + this.data.id]);
    }
  }
}
