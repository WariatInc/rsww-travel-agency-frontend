import { OfferDetails } from './offer-details';

export interface Reservation {
  id: string;
  offer_details: OfferDetails;
  state: string;
  offer_id: string;
  rejection_reason: string;
  price: number;
  user_id: string;
}
