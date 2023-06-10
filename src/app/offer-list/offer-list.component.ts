import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search/service/search.service';
import { SearchResult } from '../common/model/search-result';
import { Location } from '@angular/common';
import { ErrorService } from '../common/service/error.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent implements AfterViewInit, OnInit {
  page!: string;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  private country!: string;
  private dateStart!: string;
  private dateEnd!: string;
  private adults!: string;
  private kids!: string;

  public data!: SearchResult;

  public loaded: boolean = false;
  pageEvent!: PageEvent;
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.data = { result: [], max_page: 0 };
    this.page = <string>this.route.snapshot.queryParamMap.get('page');
    this.country = <string>this.route.snapshot.queryParamMap.get('country');
    this.dateStart = <string>(
      this.route.snapshot.queryParamMap.get('date_start')
    );
    this.dateEnd = <string>this.route.snapshot.queryParamMap.get('date_end');

    this.newSearch();
  }

  ngAfterViewInit() {}

  navigateToOffer(id: string) {
    this.router.navigate(['offer/' + id]);
  }

  onPaginateChange($event: PageEvent) {
    if ($event.pageIndex) {
      this.page = <string>(<unknown>($event.pageIndex + 1));
    } else {
      this.page = '1';
    }

    this.newSearch();

    const urlTree = this.router.createUrlTree([], {
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(urlTree);
  }

  newSearch(): void {
    this.loaded = false;
    this.searchService
      .getSearchOffers({
        page: this.page,
        country: this.country,
        date_start: this.dateStart,
        date_end: this.dateEnd,
      })
      .subscribe((result) => {
        this.data = result;
        this.loaded = true;
      });
  }
}
