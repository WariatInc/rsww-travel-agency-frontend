import { NgModule } from '@angular/core';
import { AutocompleteInputComponent } from './component/autocomplete-input/autocomplete-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';

@NgModule({
  declarations: [AutocompleteInputComponent],
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgForOf,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [AutocompleteInputComponent],
})
export class CommonModule {}
