import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guard/auth.guard';

const routes: Routes = [
  {
    path: 'offer-list',
    loadChildren: () =>
      import('./offer-list/offer-list.module').then((m) => m.OfferListModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'reservation-list',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./reservation-list/reservation-list.module').then(
        (m) => m.ReservationListModule
      ),
  },
  {
    path: 'offer/:offerId',
    loadChildren: () =>
      import('./single-offer/single-offer.module').then(
        (m) => m.SingleOfferModule
      ),
  },

  {
    path: 'tour/:tourId/adults/:adults/kids/:kids',
    loadChildren: () =>
      import('./single-offer/single-offer.module').then(
        (m) => m.SingleOfferModule
      ),
  },

  {
    path: 'offer/:offerId/reservation/:reservationId',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./single-offer/single-offer.module').then(
        (m) => m.SingleOfferModule
      ),
  },
  {
    path: 'event-dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./event-dashboard/event-dashboard.module').then(
        (m) => m.EventDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
