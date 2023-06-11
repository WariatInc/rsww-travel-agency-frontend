import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
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
import { OfferForTour } from './model/offer-for-tour';
import { PageEvent } from '@angular/material/paginator';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
})
export class SingleOfferComponent implements OnInit, OnDestroy {
  @ViewChild(AutocompleteInputComponent) autocomplete:
    | AutocompleteInputComponent
    | undefined;

  private pageUrl: string | undefined;
  private offerId: string | null | undefined;
  private reservationId: string | null | undefined;
  public offer!: Offer;
  public loadingOfferInfo: boolean = true;
  public isOffer: boolean = false;
  public isReservation: boolean = false;
  public isTour: boolean = false;
  public reservation!: Reservation;
  public offerPrice: string | undefined;
  numberOptions: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  public kidsUpTo3!: string;
  public kidsUpTo10!: string;

  public kidsForm = this.formBuilder.group({
    kidsUpTo3: '',
    kidsUpTo10: '',
  });

  public offerList: OfferForTour[] = [];
  public loadingOffers: boolean = false;

  public tooMuchKids: boolean = false;
  private tourId: string | null | undefined;

  displayedColumns: string[] = [
    'Ilość dorosłych',
    'Ilość dzieci',
    'All inclusive',
    'Typ pokoju',
    'Śniadanie',
    'Cena',
    'Rezerwuj',
  ];

  filters = this.formBuilder.group({
    room: 'Wszystkie',
    all_inclusive: false,
    breakfast: false,
  });

  public maxPage!: number;
  pageEvent!: PageEvent;
  private page: string = '1';
  private adults: string | undefined;
  private kids: string | undefined;
  private subscription!: Subscription;
  public userCount!: number;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private reservationService: ReservationService,
    private _snackBar: MatSnackBar,
    private authUser: AuthService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.pageUrl = this.router.url;
    this.authService.postSessionInfo(this.pageUrl).subscribe();

    if (this.router.url.includes('offer')) {
      this.isOffer = true;
    }

    if (this.router.url.includes('reservation')) {
      this.isReservation = true;
      this.isOffer = false;
    }

    if (this.router.url.includes('tour')) {
      this.isTour = true;
      this.adults = <string>this.route.snapshot.paramMap.get('adults');
      this.kids = <string>this.route.snapshot.paramMap.get('kids');
    }

    this.offerId = this.route.snapshot.paramMap.get('offerId');
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
    this.tourId = this.route.snapshot.paramMap.get('tourId');

    if (this.isOffer || this.isReservation) {
      this.offerService.getOfferInfo(this.offerId).subscribe((offer) => {
        this.offer = offer;
        this.loadingOfferInfo = false;
      });
    }

    if (this.isTour) {
      this.offerService.getTourInfo(this.tourId).subscribe((tour) => {
        this.offer = tour;
        this.loadingOfferInfo = false;
        this.getOfferList();
      });
      this.subscription = timer(0, 10000).subscribe(() => {
        this.refreshVisibility();
      });
    }

    if (this.isReservation) {
      this.initReservation();
    }
    this.initPrice(0, 0);

    this.filters.valueChanges.subscribe((selectedValue) => {
      if (selectedValue['room'] === undefined) {
        this.filters.controls.room.setValue('Wszystkie');
      }

      const breakfast = this.filters.controls.breakfast.getRawValue();
      const allInclusive = this.filters.controls.all_inclusive.getRawValue();
      let room = this.filters.controls.room.getRawValue();

      if (room === 'Wszystkie') {
        room = null;
      } else if (room === 'Apartament') {
        room = 'apartment';
      } else if (room === 'Studio') {
        room = 'studio';
      } else if (room === 'Standard') {
        room = 'standard';
      } else if (room === 'Family') {
        room = 'family';
      }
      this.loadingOffers = true;
      this.page = '1';
      this.offerService
        .getFilteredOfferList(
          this.tourId,
          this.page,
          room,
          breakfast,
          allInclusive,
          this.adults,
          this.kids
        )
        .subscribe((response) => {
          this.offerList = response.result;
          this.maxPage = response.max_page;
          this.loadingOffers = false;
        });
    });
  }

  ngOnDestroy() {
    if (this.isTour) {
      this.subscription.unsubscribe();
    }
  }

  private refreshVisibility() {
    this.offerService.getVisibility(this.pageUrl).subscribe((response) => {
      this.userCount = response.user_sessions_count;
    });
  }

  public getOfferList(): void {
    this.loadingOffers = true;
    this.offerService
      .getOfferList(this.tourId, this.page, this.adults, this.kids)
      .subscribe((response) => {
        this.offerList = response.result;
        this.maxPage = response.max_page;
        this.loadingOffers = false;
      });
  }

  onPaginateChange($event: PageEvent) {
    if ($event.pageIndex) {
      this.page = <string>(<unknown>($event.pageIndex + 1));
    } else {
      this.page = '1';
    }

    this.getOfferList();
  }

  initPrice(kidsUpTo3: number, kidsUpTo10: number): void {}

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

  makeNewReservation(id: string): void {
    const func = (): void => {
      const dialogRef = this.dialog.open(ConfirmReservationDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.reservationService
            .makeReservation(<string>id)
            .subscribe((reservation) => {
              this.router.navigate(['reservation-list']);
            });
        }
      });
    };
    this.authUser.doIfUserLoggedIn(func, this.pageUrl);
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
