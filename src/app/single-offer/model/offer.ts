export interface Offer {
  offer_id: number;
  tour_id: number;
  operator: string;
  country: string;
  city: string;
  description: string;
  thumbnail_url: string;
  arrival_date: string;
  hotel: string;
  departure_date: string;
  departure_city: string;
  transport: string;
  number_of_adults: number;
  number_of_kids: number;
  room_type: string;
  is_available: boolean;
}
