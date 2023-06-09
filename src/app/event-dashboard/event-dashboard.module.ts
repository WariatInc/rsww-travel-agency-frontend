import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDashboardRoutingModule } from './event-dashboard-routing.module';
import { EventDashboardComponent } from './event-dashboard.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [EventDashboardComponent],
  imports: [CommonModule, EventDashboardRoutingModule, MatTableModule],
})
export class EventDashboardModule {}
