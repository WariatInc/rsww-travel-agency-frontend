import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleOfferRoutingModule } from './single-offer-routing.module';
import { SingleOfferComponent } from './single-offer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SingleOfferComponent],
  imports: [
    CommonModule,
    SingleOfferRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class SingleOfferModule {}
