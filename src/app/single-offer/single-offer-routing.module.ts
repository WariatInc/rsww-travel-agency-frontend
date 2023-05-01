import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleOfferComponent } from './single-offer.component';

const routes: Routes = [{ path: '', component: SingleOfferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleOfferRoutingModule { }
