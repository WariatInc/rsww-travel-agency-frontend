import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from './model/event';
import { EventsService } from './service/events.service';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css'],
})
export class EventDashboardComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private pageUrl!: string;
  constructor(
    private eventService: EventsService,
    private router: Router,
    private authService: AuthService
  ) {}

  displayedColumns: string[] = [
    'Timestamp',
    'ID',
    'OfferID',
    'ReservationID',
    'State',
  ];
  public reservationEvents!: Event[];
  public max_page: number | undefined;

  ngOnInit() {
    this.pageUrl = this.router.url;
    this.authService.postSessionInfo(this.pageUrl).subscribe();
    this.subscription = timer(0, 2000).subscribe(() => {
      this.refreshEvents();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private refreshEvents() {
    this.eventService.getEvents().subscribe((response) => {
      this.reservationEvents = response.reservation_events;
      this.max_page = response.total_pages;
    });
  }
}
