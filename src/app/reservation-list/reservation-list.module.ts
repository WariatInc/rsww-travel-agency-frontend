import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationListRoutingModule } from './reservation-list-routing.module';
import { ReservationListComponent } from './reservation-list.component';


@NgModule({
  declarations: [
    ReservationListComponent
  ],
  imports: [
    CommonModule,
    ReservationListRoutingModule
  ]
})
export class ReservationListModule { }
