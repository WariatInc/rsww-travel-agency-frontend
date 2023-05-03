import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from './service/offer-service';
import { Offer } from '../common/model/offer';
import { CancelDialogComponent } from '../common/component/cancel-dialog/cancel-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
            } else {
              this._snackBar.open('Błąd przy odwoływaniu rezerwacji', 'OK');
            }
          });
      }
    });
  }
}
