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
import { Location } from '@angular/common';
import { ErrorService } from '../common/service/error.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchOptions } from '../common/model/search-options';
import { Observable, of } from 'rxjs';

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
  private dateStart!: string;
  private dateEnd!: string;
  private adults!: string;
  private kids!: string;
  countryOptions: string[] = [];

  public data!: SearchResult;
  searchOptions!: SearchOptions;

  public optionsLoaded: boolean = false;
  public loaded: boolean = false;
  pageEvent!: PageEvent;
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.data = { result: [], max_page: 0 };
    this.page = <string>this.route.snapshot.queryParamMap.get('page');
    this.country = <string>this.route.snapshot.queryParamMap.get('country');
    this.dateStart = <string>(
      this.route.snapshot.queryParamMap.get('date_start')
    );
    this.dateEnd = <string>this.route.snapshot.queryParamMap.get('date_end');

    this.newSearch();

    this.searchService.getTourSearchOptions().subscribe((options) => {
      this.searchOptions = options;
      this.countryOptions = options.country;
      this.optionsLoaded = true;
    });

    this.submitForm.controls.country.setValue(this.country);
    this.submitForm.controls.startDate.setValue(this.dateStart);
    this.submitForm.controls.endDate.setValue(this.dateEnd);
  }

  ngAfterViewInit() {}

  navigateToOffer(id: string) {
    this.router.navigate(['offer/' + id]);
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
    this.page = <string>this.route.snapshot.queryParamMap.get('page');
    this.country = <string>this.route.snapshot.queryParamMap.get('country');
    this.dateStart = <string>(
      this.route.snapshot.queryParamMap.get('date_start')
    );
    this.dateEnd = <string>this.route.snapshot.queryParamMap.get('date_end');

    this.searchService
      .getSearchOffers({
        page: this.page,
        country: this.country,
        date_start: this.dateStart,
        date_end: this.dateEnd,
      })
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
    this.dateStart = <string>this.submitForm.controls.startDate.value;
    this.dateEnd = <string>this.submitForm.controls.endDate.value;
    this.searchService
      .getSearchOffers({
        page: this.page,
        country: this.country,
        date_start: this.dateStart,
        date_end: this.dateEnd,
      })
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

  public submitForm = this.formBuilder.group({
    country: '',
    startDate: '',
    endDate: '',
    adultNumber: '',
    childrenNumber: '',
  });

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  changeURL(): Observable<void> {
    this.router.navigate(['./offer-list'], {
      queryParams: {
        page: 1,
        country: this.submitForm.value.country,
        date_start: this.submitForm.value.startDate,
        date_end: this.submitForm.value.endDate,
      },
    });
    return of(undefined);
  }
}
