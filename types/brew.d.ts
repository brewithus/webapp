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
  content: string;
  rating: number;
  user?: BrewUser;
  created: Date;
  updated?: Date;
}
