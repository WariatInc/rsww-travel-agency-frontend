import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  countryOptions: string[] = ['Polska', 'Niemcy', 'Włochy', 'Anglia', 'Grecja'];

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
    this.countryOptions.unshift('Gdziekolwiek');
  }

  public submitSearch(): void {
    console.log('submit search');
    console.log(this.submitForm.value);
    this.router.navigate(['./offer-list']);
  }
}