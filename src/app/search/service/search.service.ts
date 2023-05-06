import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchOffer } from '../../common/model/search-offer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParams } from '../../common/model/search-params';
import { SearchResult } from '../../common/model/search-result';

const offerSearchUrl = 'http://localhost:8010/api/offer/search/';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

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
      params.date_start = searchParams.date_start;
    }
    if (searchParams.date_end !== '') {
      params.date_end = searchParams.date_end;
    }
    if (searchParams.adults !== '') {
      params.adults = searchParams.adults;
    }
    if (searchParams.kids !== '') {
      params.kids = searchParams.kids;
    }

    return this.http.get<SearchResult>(offerSearchUrl, { params });
  }
}
