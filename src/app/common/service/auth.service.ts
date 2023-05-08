import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private _snackbar: MatSnackBar) {}
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');

    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('isLoggedIn'));
  }

  userIsAuth(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserInfo(): string | string[] {
    let userInfo = localStorage.getItem('token');

    if (userInfo === null) {
      userInfo = '';
    }

    return userInfo;
  }

  doIfUserLoggedIn(callback: () => void): void {
    if (this.userIsAuth()) {
      callback();
    } else {
      this._snackbar
        .open('Żeby to zrobić musisz się zalogować', 'OK')
        .onAction()
        .subscribe(() => {
          this.router.navigate(['login']).then(this.refresh);
        });
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
