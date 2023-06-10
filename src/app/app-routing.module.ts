import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'tour/:tourId',
    loadChildren: () =>
      import('./single-offer/single-offer.module').then(
        (m) => m.SingleOfferModule
      ),
  },

  {
    path: 'offer/:offerId/reservation/:reservationId',
    loadChildren: () =>
      import('./single-offer/single-offer.module').then(
        (m) => m.SingleOfferModule
      ),
  },
  {
    path: 'event-dashboard',
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
