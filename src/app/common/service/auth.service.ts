import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from './error.service';

let apiUrl = environment.API_URL;

const sessionUrl = apiUrl + 'api/users/sessions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userIsAuthenticated: boolean = false;
  public redirectUrl: string | undefined;
  private sessionId: string | undefined;

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

  login(value: any): void {
    if (value) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', value);
      this.userIsAuth();

      if (this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl);
      } else {
        this.router.navigateByUrl('./');
      }
    }
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

  doIfUserLoggedIn(callback: () => void, redirectUrl: string = ''): void {
    if (this.userIsAuthenticated) {
      callback();
    } else {
      this.redirectUrl = redirectUrl;
      this.goToLoginSnackbar();
    }
  }

  goToLoginSnackbar(): void {
    this._snackbar
      .open('Żeby to zrobić musisz się zalogować', 'OK')
      .onAction()
      .subscribe(() => {
        this.router.navigate(['login']);
      });
  }

  postSessionInfo(page: string): void {
    this.redirectUrl = page;

    const session_id = localStorage.getItem('session_id');

    if (session_id) {
      this.http
        .post<void>(sessionUrl, {
          webapp_page: page,
          session_id: session_id,
        })
        .subscribe((response: any) => {
          localStorage.setItem('session_id', response.session_id);
        });
    } else {
      this.http
        .post<void>(sessionUrl, { webapp_page: page })
        .subscribe((response: any) => {
          localStorage.setItem('session_id', response.session_id);
        });
    }
  }
}
