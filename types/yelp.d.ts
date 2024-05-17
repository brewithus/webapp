export type YelpBizDetails = YelpBiz & YelpBizMore;

export interface YelpBiz {
  id: string;
  alias: string;
  name: string;
  image_url: string | null;
  is_closed: boolean | null;
  url: string | null;
  review_count: number | null;
  categories: Category[];
  rating: number | null;
  coordinates: Coordinates; // required
  transactions: string[];
  price?: string;
  phone: string; // required
  display_phone: string; // required
  distance: number | null;
  location: Location;
  attributes: Attributes;
}

export interface YelpBizMore {
  hours: Hour[];
  photo_details: PhotoDetail[];
  photo_count: number;
  photos: string[];
  is_claimed: boolean;
  messaging: Messaging;
  yelp_menu_url: string;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Location {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
  cross_streets?: string;
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
  business_url: string | null;
  about_this_biz_business_recommendation: string[];
  about_this_biz_history: string | null;
  about_this_biz_specialties: string | null;
  about_this_biz_year_established: string | null;
  bike_parking: boolean | null;
  business_accepts_credit_cards: boolean | null;
  business_parking: Parking | null;
  caters: boolean | null;
  dogs_allowed: boolean | null;
  drive_thru?: boolean | null;
  noise_level: string | null;
  restaurants_delivery: boolean | null;
  restaurants_take_out: boolean | null;
  wi_fi?: string | null;
  outdoor_seating?: boolean | null;
  business_temp_closed: boolean | null;
  menu_url: string | null;
  [key: string]: unknown;
}

export interface Parking {
  valet: boolean | null;
  garage: boolean | null;
  street: boolean | null;
  lot: boolean | null;
  validated: boolean | null;
}

export interface Messaging {
  url: string;
  use_case_text: string;
  response_rate: number | null;
  response_time: number | null;
}
