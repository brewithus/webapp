export interface Business {
  id: string;
  name: string;
  picture: string;
  address: string;
  tags: string[];
  menuItems: MenuItem[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  categories: string[];
  status: string;
  hours: string;
  location: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  text: string;
  time_created: string;
  // url: string;
}

export interface User {
  id: string;
  name: string;
  image_url: string;
  // profile_url: string;
}
