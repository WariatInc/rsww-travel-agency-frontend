import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
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
}
