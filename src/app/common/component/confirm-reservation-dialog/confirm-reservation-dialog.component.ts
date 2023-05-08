import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirm-reservation-dioalog',
  templateUrl: 'confirm-reservation-dialog.component.html',
})
export class ConfirmReservationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmReservationDialogComponent>
  ) {}
}
