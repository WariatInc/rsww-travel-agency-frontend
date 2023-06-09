import { Event } from './event';

export interface EventsResponse {
  reservation_events: Event[];
  total_pages: number;
}
