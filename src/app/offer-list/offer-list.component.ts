import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search/service/search.service';
import { SearchResult } from '../common/model/search-result';
import { formatDate, Location } from '@angular/common';
import { ErrorService } from '../common/service/error.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SearchOptions } from '../common/model/search-options';
import { Observable, of } from 'rxjs';
import { AuthService } from '../common/service/auth.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent implements AfterViewInit, OnInit {
  page!: string;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  private country!: string;
  private dateStart: string | undefined;
  private dateEnd: string | undefined;
  private adults!: string;
  private kids!: string;
  countryOptions: string[] = [];

  public data!: SearchResult;
  searchOptions!: SearchOptions;

  sortowanie = this.formBuilder.group({
    sortowanko: 'Data',
  });

  private prevSortowanie: string | null | undefined = 'Data';

  childrenNumberOptions: string[] = ['0', '1', '2', '3', '4'];
  adultNumberOptions: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  public optionsLoaded: boolean = false;
  public loaded: boolean = false;
  pageEvent!: PageEvent;
  public submitForm = this.formBuilder.group({
    country: [''],
    startDate: [new Date()],
    endDate: [new Date()],
    adultNumber: ['', Validators.required],
    childrenNumber: ['', Validators.required],
    sortowanie: [''],
  });

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  private pageUrl!: string;
  private sortowanko: string = 'arrival_date';
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.pageUrl = this.router.url;
    this.authService.postSessionInfo(this.pageUrl);

    this.data = { result: [], max_page: 0 };
    this.page = <string>this.route.snapshot.queryParamMap.get('page');
    this.country = <string>this.route.snapshot.queryParamMap.get('country');
    this.dateStart = <string>(
      this.route.snapshot.queryParamMap.get('date_start')
    );
    this.dateEnd = <string>this.route.snapshot.queryParamMap.get('date_end');

    this.adults = <string>this.route.snapshot.queryParamMap.get('adults');
    this.kids = <string>this.route.snapshot.queryParamMap.get('kids');

    this.searchService.getTourSearchOptions().subscribe((options) => {
      this.searchOptions = options;
      this.countryOptions = options.country;
      this.optionsLoaded = true;
    });

    this.submitForm.controls.country.setValue(this.country);
    this.submitForm.controls.adultNumber.setValue(this.adults);
    this.submitForm.controls.childrenNumber.setValue(this.kids);
    if (this.dateStart && this.dateEnd) {
      this.submitForm.controls.startDate.setValue(new Date(this.dateStart));
      this.submitForm.controls.endDate.setValue(new Date(this.dateEnd));
    } else {
      this.submitForm.controls.startDate.setValue(null);
      this.submitForm.controls.endDate.setValue(null);
    }

    if (this.submitForm.valid) {
      this.newSearch();
    }

    this.sortowanie.valueChanges.subscribe((selectedValue) => {
      if (selectedValue['sortowanko'] !== this.prevSortowanie) {
        if (selectedValue['sortowanko'] === undefined) {
          this.sortowanie.controls.sortowanko.setValue('Data');
        }

        if (selectedValue['sortowanko'] === 'Data') {
          this.sortowanko = 'arrival_date';
        } else {
          this.sortowanko = 'price';
        }

        this.loaded = false;
        this.data = { result: [], max_page: 0 };
        this.searchService
          .getSortedSearchOffers(
            {
              page: this.page,
              country: this.country,
              date_start: this.dateStart,
              date_end: this.dateEnd,
              adults: this.adults,
              kids: this.kids,
            },
            this.sortowanko
          )
          .subscribe((result) => {
            this.data = result;
            this.loaded = true;
          });
        this.prevSortowanie = selectedValue['sortowanko'];
      }
    });
  }

  ngAfterViewInit() {}

  navigateToTour(id: string) {
    if (!this.kids) {
      this.kids = '0';
    }
    this.router.navigate([
      'tour/' + id + '/adults/' + this.adults + '/kids/' + this.kids,
    ]);
  }

  onPaginateChange($event: PageEvent) {
    if ($event.pageIndex) {
      this.page = <string>(<unknown>($event.pageIndex + 1));
    } else {
      this.page = '1';
    }

    this.newSearch();

    const urlTree = this.router.createUrlTree([], {
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(urlTree);
  }

  newSearch(): void {
    this.loaded = false;
    this.data = { result: [], max_page: 0 };
    this.country = <string>this.route.snapshot.queryParamMap.get('country');
    this.dateStart = <string>(
      this.route.snapshot.queryParamMap.get('date_start')
    );
    this.dateEnd = <string>this.route.snapshot.queryParamMap.get('date_end');

    this.searchService
      .getSearchOffers(
        {
          page: this.page,
          country: this.country,
          date_start: this.dateStart,
          date_end: this.dateEnd,
          adults: this.adults,
          kids: this.kids,
        },
        this.sortowanko
      )
      .subscribe((result) => {
        this.data = result;
        this.loaded = true;
      });
  }

  newSearchFromForm(): void {
    this.loaded = false;
    this.data = { result: [], max_page: 0 };
    this.page = '1';
    this.country = <string>this.submitForm.controls.country.value;
    this.dateStart = this.submitForm.controls.startDate.value?.toDateString();
    this.dateEnd = this.submitForm.controls.endDate.value?.toDateString();
    this.kids = <string>this.submitForm.controls.childrenNumber.value;
    this.adults = <string>this.submitForm.controls.adultNumber.value;

    this.searchService
      .getSearchOffers(
        {
          page: this.page,
          country: this.country,
          date_start: this.dateStart,
          date_end: this.dateEnd,
          adults: this.adults,
          kids: this.kids,
        },
        this.sortowanko
      )
      .subscribe((result) => {
        this.data = result;
        this.loaded = true;
      });
  }

  public submitSearch(): void {
    this.changeURL().subscribe(() => {
      this.newSearchFromForm();
    });
  }

  changeURL(): Observable<void> {
    this.router.navigate(['./offer-list'], {
      queryParams: {
        page: 1,
        country: this.submitForm.value.country,
        date_start: this.submitForm.value.startDate,
        date_end: this.submitForm.value.endDate,
        adults: this.submitForm.value.adultNumber,
        kids: this.submitForm.value.childrenNumber,
      },
    });
    return of(undefined);
  }
}
