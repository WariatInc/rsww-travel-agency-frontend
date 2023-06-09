import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import { environment } from '../../../environments/environment';
import { EventsResponse } from '../model/events-response';
import { AuthService } from '../../common/service/auth.service';

let apiUrl = environment.API_URL;
const eventsUrl = apiUrl + 'api/reservations/events?size=100';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  getEvents(): Observable<EventsResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getUserInfo(),
    });
    let options = { headers: headers };
    return this.http.get<EventsResponse>(eventsUrl, options).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }
}
