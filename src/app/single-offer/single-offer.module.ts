import { NgModule } from '@angular/core';
import { SingleOfferRoutingModule } from './single-offer-routing.module';
import { SingleOfferComponent } from './single-offer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { NgIf } from '@angular/common';

@NgModule({
  declarations: [SingleOfferComponent],
  imports: [
    CommonModule,
    SingleOfferRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    NgIf,
  ],
})
export class SingleOfferModule {}
