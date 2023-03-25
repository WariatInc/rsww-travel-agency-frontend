import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: 'autocomplete-input.component.html',
  styleUrls: ['autocomplete-input.component.css'],
})
export class AutocompleteInputComponent implements OnInit {
  @Input() options: string[] | undefined;
  @Input() label: string | undefined;

  @Input() formName: string | undefined;

  @Input() formGroupName: FormGroup | undefined;
  definedOptions = [''];
  myControl = new FormControl('');

  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.definedOptions = this.options ?? [''];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.definedOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public doNothing(): void {
    console.log('do nothing for now');
  }
}
