import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from './service/offer-service';
import { Offer } from '../common/model/offer';
import { CancelDialogComponent } from '../common/component/cancel-dialog/cancel-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from '../reservation-list/service/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewReservationDialog } from '../common/component/new-reservation-dialog/new-reservation-dialog.component';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
})
export class SingleOfferComponent implements OnInit {
  private offerId: string | null | undefined;
  private reservationId: string | null | undefined;
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

    this.offerId = this.route.snapshot.paramMap.get('offerId');
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
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
          .cancelReservation(this.reservationId)
          .subscribe(() => {
            this._snackBar.open('Odwołano rezerwację', 'OK');
            this.router.navigate(['offer/' + this.offerId]);
          });
      }
    });
  }

  makeNewReservation(): void {
    this.dialog.open(NewReservationDialog, {
      disableClose: true,
      height: '42%',
      data: { id: this.offerId, isReserved: false },
    });
  }
}
