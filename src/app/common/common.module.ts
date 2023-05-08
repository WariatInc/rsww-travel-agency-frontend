import { NgModule } from '@angular/core';
import { AutocompleteInputComponent } from './component/autocomplete-input/autocomplete-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CancelDialogComponent } from './component/cancel-dialog/cancel-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewReservationDialog } from './component/new-reservation-dialog/new-reservation-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmReservationDialogComponent } from './component/confirm-reservation-dialog/confirm-reservation-dialog.component';

@NgModule({
  declarations: [
    AutocompleteInputComponent,
    CancelDialogComponent,
    NewReservationDialog,
    ConfirmReservationDialogComponent,
  ],
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
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgIf,
  ],
  exports: [AutocompleteInputComponent],
})
export class CommonModule {}
