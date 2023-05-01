import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationListRoutingModule } from './reservation-list-routing.module';
import { ReservationListComponent } from './reservation-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ReservationListComponent],
  imports: [
    CommonModule,
    ReservationListRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ReservationListModule {}
