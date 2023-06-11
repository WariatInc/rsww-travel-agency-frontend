import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from './error.service';

let apiUrl = environment.API_URL;

const sessionUrl = apiUrl + 'api/users/sessions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userIsAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private http: HttpClient
  ) {}
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.userIsAuth();
  }

  userIsAuth(): void {
    this.userIsAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserInfo(): string | string[] {
    let userInfo = localStorage.getItem('token');

    if (userInfo === null) {
      userInfo = '';
    }

    return userInfo;
  }

  doIfUserLoggedIn(callback: () => void): void {
    if (this.userIsAuthenticated) {
      callback();
    } else {
      this.goToLoginSnackbar();
    }
  }

  refresh(): void {
    window.location.reload();
  }

  goToLoginSnackbar(): void {
    this._snackbar
      .open('Żeby to zrobić musisz się zalogować', 'OK')
      .onAction()
      .subscribe(() => {
        this.router.navigate(['login']).then(this.refresh);
      });
  }

  postSessionInfo(page: string): Observable<void> {
    return this.http.post<void>(sessionUrl, { webapp_page: page });
  }
}
