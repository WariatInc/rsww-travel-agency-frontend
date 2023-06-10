import { NgModule } from '@angular/core';

import { OfferListRoutingModule } from './offer-list-routing.module';
import { OfferListComponent } from './offer-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgForOf, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [OfferListComponent],
  imports: [
    CommonModule,
    OfferListRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgIf,
    NgForOf,
    MatNativeDateModule,
  ],
})
export class OfferListModule {}
