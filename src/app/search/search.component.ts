import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchOptions } from '../common/model/search-options';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {}

  searchOptions!: SearchOptions;
  loaded: boolean = false;
  countryOptions: string[] = [];

  numberOptions: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public submitForm = this.formBuilder.group({
    country: '',
    startDate: '',
    endDate: '',
    adultNumber: '',
    childrenNumber: '',
  });

  ngOnInit() {
    this.searchService.getSearchOptions().subscribe((options) => {
      this.searchOptions = options;
      this.countryOptions = options.country;
      this.loaded = true;
    });
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
}
