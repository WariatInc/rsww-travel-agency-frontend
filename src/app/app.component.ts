import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './common/service/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RSWW Travel Agency App';
  userLoggedIn = false;
  username: string | null | undefined;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.authUser();
  }

  private authUser(): void {
    this.userLoggedIn = this.authService.userIsAuth();
    this.username = localStorage.getItem('token');
    console.log(this.username);
  }

  public goHome(): void {
    this.router.navigate(['./']);
  }

  public goLogin(): void {
    this.router.navigate(['./login']);
  }

  public goReservationList(): void {
    this.router.navigate(['./reservation-list']);
  }

  public logoutUser(): void {
    this.authService.logout();
    this.userLoggedIn = this.authService.userIsAuth();
    this.goHome();
  }

  refresh(): void {
    window.location.reload();
  }
}
