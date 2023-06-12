import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SearchOptions } from '../common/model/search-options';
import { SearchService } from './service/search.service';
import { AuthService } from '../common/service/auth.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private pageUrl!: string;
  private subscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  searchOptions!: SearchOptions;
  loaded: boolean = false;
  countryOptions: string[] = [];

  popularHotels: string[] = [];
  popularCountries: string[] = [];
  popularRooms: string[] = [];

  childrenNumberOptions: string[] = ['0', '1', '2', '3', '4'];
  adultNumberOptions: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public submitForm = this.formBuilder.group({
    country: [''],
    startDate: [''],
    endDate: [''],
    adultNumber: ['', Validators.required],
    childrenNumber: ['', Validators.required],
  });

  ngOnInit() {
    this.pageUrl = this.router.url;
    this.authService.postSessionInfo(this.pageUrl);

    this.searchService.getTourSearchOptions().subscribe((options) => {
      this.searchOptions = options;
      this.countryOptions = options.country;
      this.loaded = true;
    });

    this.subscription = timer(0, 5000).subscribe(() => {
      this.getPopularInfo();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public submitSearch(): void {
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
  }

  public getPopularInfo(): void {
    this.searchService.getPopularInfo().subscribe((response) => {
      this.popularHotels = response.hotels;
      this.popularCountries = response.countries;
      this.popularRooms = response.room_types;
    });
  }
}
