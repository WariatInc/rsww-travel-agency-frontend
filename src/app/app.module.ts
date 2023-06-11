import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from './common/common.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './common/guard/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
