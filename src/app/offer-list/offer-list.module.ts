import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferListRoutingModule } from './offer-list-routing.module';
import { OfferListComponent } from './offer-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [OfferListComponent],
  imports: [
    CommonModule,
    OfferListRoutingModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class OfferListModule {}
