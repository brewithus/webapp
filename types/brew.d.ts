import type { Category, YelpBiz } from './yelp';

export interface BrewUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  updated?: Date;
  created: Date;
}

export interface BrewReview {
  id: string;
  bizID: string;
  content: string;
  rating: number;
  user?: BrewUser;
  created: Date;
  updated?: Date;
}

export interface ReviewWithBiz extends BrewReview {
  biz: YelpBiz;
}

export interface CategoryWithCount extends Category {
  count: number;
}
