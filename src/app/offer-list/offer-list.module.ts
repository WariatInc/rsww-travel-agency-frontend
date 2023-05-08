import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OfferListRoutingModule } from './offer-list-routing.module';
import { OfferListComponent } from './offer-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [OfferListComponent],
  imports: [
    CommonModule,
    OfferListRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class OfferListModule {}
