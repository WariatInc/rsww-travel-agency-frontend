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

  @Input() formName: string = '';

  @Input() parentForm!: FormGroup;
  definedOptions!: string[];

  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    console.log(this.parentForm, this.formName);
    this.definedOptions = this.options ?? [''];
    this.filteredOptions = this.parentForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: FormGroup): string[] {
    let filterValue = '';
    if (value) {
      filterValue = value[this.formName as keyof typeof value].toLowerCase();
    }

    return this.definedOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
