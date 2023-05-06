import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router, private _snackbar: MatSnackBar) {}
  errorMsg!: string;
  errorCatcher(error: ErrorEvent): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      this.errorMsg = `Error: ${error.error.message}`;
    } else {
      this.errorMsg = `Error: ${error.message}`;
    }
    this._snackbar
      .open(this.errorMsg, 'OK')
      .onAction()
      .subscribe(() => {
        this.router.navigate(['./']).then(this.refresh);
      });

    return new Observable();
  }

  refresh(): void {
    window.location.reload();
  }
}
