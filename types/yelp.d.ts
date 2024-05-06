export interface YelpBusiness {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: Category[];
  rating: number;
  location: Location;
  coordinates: Coordinates;
  photos: string[];
  photo_details: PhotoDetail[];
  photo_count: number;
  price: string;
  hours: Hour[];
  attributes: Attributes;
  transactions: string[];
  messaging: Messaging;
  yelp_menu_url: string;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Location {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
  cross_streets: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PhotoDetail {
  photo_id: string;
  url: string;
  caption: string | null;
  width: number;
  height: number;
  is_user_submitted: boolean;
  user_id: string | null;
  label: string | null;
}

export interface Hour {
  open: DayHour[];
  hours_type: 'REGULAR';
  is_open_now: boolean;
}

export interface DayHour {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
}

export interface Attributes {
  business_url: string;
  about_this_biz_business_recommendation: string[];
  about_this_biz_history: string;
  about_this_biz_specialties: string;
  about_this_biz_year_established: string;
  bike_parking: boolean;
  business_accepts_credit_cards: boolean;
  business_parking: Parking;
  caters: boolean;
  dogs_allowed: boolean;
  drive_thru: boolean;
  noise_level: string;
  restaurants_delivery: boolean;
  restaurants_take_out: boolean;
  wi_fi: string;
  outdoor_seating: boolean;
  business_temp_closed: boolean | null;
  menu_url: string | null;
  [key: string]: unknown;
}

export interface Parking {
  valet: boolean;
  garage: boolean;
  street: boolean;
  lot: boolean;
  validated: boolean;
}

export interface Messaging {
  url: string;
  use_case_text: string;
  response_rate: number | null;
  response_time: number | null;
}
