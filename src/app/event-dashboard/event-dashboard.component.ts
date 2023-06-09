import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from './model/event';
import { EventsService } from './service/events.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css'],
})
export class EventDashboardComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  constructor(private eventService: EventsService) {}

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
