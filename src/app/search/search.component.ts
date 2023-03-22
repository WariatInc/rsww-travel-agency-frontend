import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  countryOptions: string[] = [
    'Bez znaczenia',
    'Polska',
    'Niemcy',
    'Włochy',
    'Anglia',
    'Grecja',
  ];

  numberOptions: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit() {}
}
