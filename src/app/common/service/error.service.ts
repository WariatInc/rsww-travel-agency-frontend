import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ObservableInput } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private authService: AuthService
  ) {}
  errorMsg!: string;
  errorCatcher(error: ErrorEvent): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      this.errorMsg = `Error: ${error.error.message}`;
    } else {
      if (error.error.status === 401) {
        this.authService.goToLoginSnackbar();
        return new Observable();
      }

      this.errorMsg = `Error: ${error.message}`;
    }

    this._snackbar
      .open(this.errorMsg, 'Strona główna', { duration: 5000 })
      .onAction()
      .subscribe(() => {
        this.router.navigate(['./']).then(this.refresh);
      });

    return new Observable();
  }

  tripNotAvailableErrorCatcher(error: ErrorEvent): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      this.errorMsg = `Error: ${error.error.message}`;
    } else {
      if (error.error.status === 401) {
        this.authService.goToLoginSnackbar();
        return new Observable();
      }
      this.errorMsg = `Error: ${error.message}`;
    }

    if (
      error.error.mesasge ===
      'reservation_exist_in_pending_accepted_or_paid_state_error'
    ) {
      this.refreshTour();
    } else {
      this._snackbar
        .open(this.errorMsg, 'Strona główna', { duration: 5000 })
        .onAction()
        .subscribe(() => {
          this.router.navigate(['./']).then(this.refresh);
        });
    }

    return new Observable();
  }

  refresh(): void {
    window.location.reload();
  }

  refreshTour(): void {
    this._snackbar
      .open('Oferta nieaktualna', 'Odśwież')
      .onAction()
      .subscribe(() => {
        this.refresh();
      });
  }
}
