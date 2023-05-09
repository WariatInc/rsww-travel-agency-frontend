import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SearchOffer } from '../../common/model/search-offer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParams } from '../../common/model/search-params';
import { SearchResult } from '../../common/model/search-result';
import { ErrorService } from '../../common/service/error.service';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';

let apiUrl = environment.API_URL;
const offerSearchUrl = apiUrl + 'api/offers/search';

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
    console.log(searchParams);
    // let params: SearchParams = {
    //   page: searchParams.page,
    //   country: searchParams.country,
    //   date_start: searchParams.date_start,
    //   date_end: searchParams.date_end,
    //   adults: searchParams.adults,
    //   kids: searchParams.kids,
    // };

    // let newSearchParams = new HttpParams({ fromObject: params });

    let params: any = {};
    params.page = searchParams.page;
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
    if (searchParams.adults !== '') {
      params.adults = searchParams.adults;
    }
    if (searchParams.kids !== '') {
      params.kids = searchParams.kids;
    }

    return this.http.get<SearchResult>(offerSearchUrl, { params }).pipe(
      catchError((error) => {
        return this.errorService.errorCatcher(error);
      })
    );
  }
}
