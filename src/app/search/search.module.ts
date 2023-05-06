import { NgModule } from '@angular/core';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { CommonModule } from '../common/common.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    JsonPipe,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class SearchModule {}
