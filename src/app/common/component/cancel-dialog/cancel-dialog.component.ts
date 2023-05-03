import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cancel-dialog',
  templateUrl: 'cancel-dialog.component.html',
})
export class CancelDialogComponent {
  constructor(public dialogRef: MatDialogRef<CancelDialogComponent>) {}
}
