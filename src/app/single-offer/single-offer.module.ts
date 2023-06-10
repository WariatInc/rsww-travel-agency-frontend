import { NgModule } from '@angular/core';
import { SingleOfferRoutingModule } from './single-offer-routing.module';
import { SingleOfferComponent } from './single-offer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { NgForOf, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

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
    NgForOf,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule,
  ],
})
export class SingleOfferModule {}
