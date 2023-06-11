import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParams } from '../../common/model/search-params';
import { SearchResult } from '../../common/model/search-result';
import { ErrorService } from '../../common/service/error.service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SearchOptions } from '../../common/model/search-options';

let apiUrl = environment.API_URL;
const tourSearchUrl = apiUrl + 'api/tours/search';
const tourSearchOptionsUrl = apiUrl + 'api/tours/search/options';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private datePipe: DatePipe
  ) {}

  getSearchOffers(searchParams: SearchParams): Observable<SearchResult> {
    let params: any = {};
    params.page = searchParams.page;
    if (searchParams.adults !== '') {
      params.adults = searchParams.adults;
    }
    if (searchParams.kids !== '') {
      params.kids = searchParams.kids;
    }
    if (searchParams.country !== '') {
      params.country = searchParams.country;
    }
    if (searchParams.date_start !== '') {
      params.date_start = this.datePipe.transform(
        searchParams.date_start,
        'yyyy-MM-dd'
      );
    }
    if (searchParams.date_end !== '') {
      params.date_end = this.datePipe.transform(
        searchParams.date_end,
        'yyyy-MM-dd'
      );
    }

    return this.http.get<SearchResult>(tourSearchUrl, { params }).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }

  getSortedSearchOffers(
    searchParams: SearchParams,
    sortBy: string | null
  ): Observable<SearchResult> {
    let params: any = {};
    params.page = searchParams.page;
    if (searchParams.adults !== '') {
      params.adults = searchParams.adults;
    }
    if (searchParams.kids !== '') {
      params.kids = searchParams.kids;
    }
    if (searchParams.country !== '') {
      params.country = searchParams.country;
    }
    if (searchParams.date_start !== '') {
      params.date_start = this.datePipe.transform(
        searchParams.date_start,
        'yyyy-MM-dd'
      );
    }
    if (searchParams.date_end !== '') {
      params.date_end = this.datePipe.transform(
        searchParams.date_end,
        'yyyy-MM-dd'
      );
    }
    params.sort_by = sortBy;

    return this.http.get<SearchResult>(tourSearchUrl, { params }).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }

  getTourSearchOptions(): Observable<SearchOptions> {
    return this.http.get<SearchResult>(tourSearchOptionsUrl).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }
}
