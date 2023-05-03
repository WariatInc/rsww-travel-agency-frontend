import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleOfferRoutingModule } from './single-offer-routing.module';
import {
  NewReservationDialog,
  SingleOfferComponent,
} from './single-offer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingleOfferComponent, NewReservationDialog],
  imports: [
    CommonModule,
    SingleOfferRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
})
export class SingleOfferModule {}
