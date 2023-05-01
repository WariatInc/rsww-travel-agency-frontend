import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleOfferRoutingModule } from './single-offer-routing.module';
import { SingleOfferComponent } from './single-offer.component';


@NgModule({
  declarations: [
    SingleOfferComponent
  ],
  imports: [
    CommonModule,
    SingleOfferRoutingModule
  ]
})
export class SingleOfferModule { }
