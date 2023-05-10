import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
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

  @Output() valueChangedEvent = new EventEmitter<string>();
  definedOptions!: string[];

  filteredOptions: Observable<string[]> | undefined;
  initialForm!: FormGroup;

  ngOnInit() {
    this.initialForm = this.parentForm;
    this.definedOptions = this.options ?? [''];
    this.filteredOptions = this.parentForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: FormGroup): string[] {
    if (
      value !== undefined &&
      value !== null &&
      value &&
      value[this.formName as keyof typeof value]
    ) {
      this.valueChangedEvent.emit(value[this.formName as keyof typeof value]);
    }

    let filterValue = '';
    if (value && value[this.formName as keyof typeof value]) {
      filterValue = value[this.formName as keyof typeof value].toLowerCase();
    }

    return this.definedOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public resetValues(): void {
    this.parentForm = this.initialForm;
  }
}
