import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RSWW Travel Agency App';

  constructor(private router: Router) {}
  ngOnInit() {}
  public goHome(): void {
    this.router.navigate(['./']);
  }

  public goLogin(): void {
    this.router.navigate(['./login']);
  }
}
