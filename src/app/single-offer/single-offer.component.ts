import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from './service/offer-service';
import { Offer } from './model/offer';
import { CancelDialogComponent } from '../common/component/cancel-dialog/cancel-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from '../reservation-list/service/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewReservationDialog } from '../common/component/new-reservation-dialog/new-reservation-dialog.component';
import { ConfirmReservationDialogComponent } from '../common/component/confirm-reservation-dialog/confirm-reservation-dialog.component';
import { AuthService } from '../common/service/auth.service';
import { Reservation } from '../common/model/reservation';
import { FormBuilder } from '@angular/forms';
import { AutocompleteInputComponent } from '../common/component/autocomplete-input/autocomplete-input.component';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
})
export class SingleOfferComponent implements OnInit {
  @ViewChild(AutocompleteInputComponent) autocomplete:
    | AutocompleteInputComponent
    | undefined;

  private offerId: string | null | undefined;
  private reservationId: string | null | undefined;
  public offer!: Offer;
  public loadingOfferInfo: boolean = true;
  public isOffer: boolean = true;
  public reservation!: Reservation;
  public offerPrice: string | undefined;
  numberOptions: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  public kidsUpTo3!: string;
  public kidsUpTo10!: string;

  public kidsForm = this.formBuilder.group({
    kidsUpTo3: '',
    kidsUpTo10: '',
  });

  public tooMuchKids: boolean = false;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private reservationService: ReservationService,
    private _snackBar: MatSnackBar,
    private authUser: AuthService,
    private formBuilder: FormBuilder
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

    if (this.reservationId) {
      this.initReservation();
    }
    this.initPrice(0, 0);
  }

  initPrice(kidsUpTo3: number, kidsUpTo10: number): void {
    this.offerService
      .getOfferPrice(this.offerId, kidsUpTo3, kidsUpTo10)
      .subscribe((price) => {
        this.offerPrice = price.price;
      });
  }

  handleUpTo3ValueChange(event: string): void {
    this.kidsUpTo3 = event;
    if (this.kidsUpTo10 === undefined) {
      this.kidsUpTo10 = '0';
    }
    if (+this.kidsUpTo3 + +this.kidsUpTo10 <= +this.offer.number_of_kids) {
      this.initPrice(+this.kidsUpTo3, +this.kidsUpTo10);
      this.tooMuchKids = false;
    } else {
      this.tooMuchKids = true;
    }
  }
  handleUpTo10ValueChange(event: string): void {
    this.kidsUpTo10 = event;
    if (this.kidsUpTo3 === undefined) {
      this.kidsUpTo3 = '0';
    }
    if (+this.kidsUpTo3 + +this.kidsUpTo10 <= +this.offer.number_of_kids) {
      this.initPrice(+this.kidsUpTo3, +this.kidsUpTo10);
      this.tooMuchKids = false;
    } else {
      this.tooMuchKids = true;
    }
  }

  initReservation(): void {
    this.reservationService
      .getReservation(this.reservationId)
      .subscribe((reservation) => {
        this.reservation = reservation;
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
    const func = (): void => {
      const dialogRef = this.dialog.open(ConfirmReservationDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.reservationService
            .makeReservation(<string>this.offerId)
            .subscribe((reservation) => {
              this.router.navigate(['reservation-list']);
            });
        }
      });
    };
    this.authUser.doIfUserLoggedIn(func);
  }

  payForReservation(): void {
    const func = (): void => {
      const dialogRef = this.dialog.open(NewReservationDialog, {
        data: { id: this.reservationId, isReserved: true },
      });
      dialogRef.afterClosed().subscribe(() => this.initReservation());
    };

    this.authUser.doIfUserLoggedIn(func);
  }
}
