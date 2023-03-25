import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferListRoutingModule } from './offer-list-routing.module';
import { OfferListComponent } from './offer-list.component';

@NgModule({
  declarations: [OfferListComponent],
  imports: [CommonModule, OfferListRoutingModule],
})
export class OfferListModule {}
