import { firebaseDB } from '@/config/firebase';
import type {
  BrewReview,
  BrewUser,
  CategoryWithCount,
  ReviewWithBiz,
} from '@/types/brew';
import { type YelpBiz } from '@/types/yelp';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  doc,
  getDoc,
  type DocumentReference,
} from 'firebase/firestore';
import { type UseQueryResult, useQuery } from 'react-query';

export const createReview = async (
  uid: string,
  bizID: string,
  content: string,
  rating: number,
  replyTo?: string,
): Promise<void> => {
  try {
    const reviewsCollection = collection(firebaseDB, 'reviews');
    const userDocRef = doc(firebaseDB, 'users', uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const newReviewData = {
        user: userDocRef, // Reference to the user document
        bizID,
        content,
        rating,
        created: serverTimestamp(),
      };

      const docRef = await addDoc(reviewsCollection, newReviewData);
      console.log('Review created with ID:', docRef.id);
    } else {
      console.error('User not found');
      throw Error('User not found');
    }
  } catch (error) {
    console.error('Error creating review:', error);
    throw Error('Error creating review');
  }
};

export const getReviewsByBizID = async (
  bizID: string,
): Promise<BrewReview[]> => {
  try {
    const reviewsCollection = collection(firebaseDB, 'reviews');
    const querySnapshot = await getDocs(
      query(reviewsCollection, where('bizID', '==', bizID)),
    );
    const reviews: BrewReview[] = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const { content, rating, created, updated, user } = doc.data();
        const userSnapshot = await getDoc(user as DocumentReference);
        const userData = userSnapshot.data() as BrewUser;
        return {
          id: doc.id,
          content,
          rating,
          bizID,
          created: created?.toDate(),
          updated: updated?.toDate(),
          user: userData,
        };
      }),
    );
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const getReviewsByUserID = async (
  userID: string,
): Promise<BrewReview[]> => {
  try {
    const reviewsCollection = collection(firebaseDB, 'reviews');
    const userDocRef = doc(firebaseDB, 'users', userID);

    // Create a query against the collection.
    const q = query(reviewsCollection, where('user', '==', userDocRef));
    const querySnapshot = await getDocs(q);

    const reviews: BrewReview[] = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const userSnapshot = await getDoc(data.user as DocumentReference);
        const userData = userSnapshot.data() as BrewUser;

        return {
          id: docSnapshot.id,
          content: data.content,
          rating: data.rating,
          bizID: data.bizID,
          created: data.created?.toDate(), // Converting timestamp to Date object
          updated: data.updated?.toDate(), // Converting timestamp to Date object
          user: userData,
        };
      }),
    );

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews by user ID:', error);
    return [];
  }
};

export const useUserReviews = (
  uid: string,
): UseQueryResult<BrewReview[], Error> => {
  return useQuery(
    ['reviews', 'users', uid],
    async () => {
      return await getReviewsByUserID(uid);
    },
    {
      enabled: !!uid,
    },
  );
};

export const getReviewsWithBiz = async (
  reviews: BrewReview[],
): Promise<ReviewWithBiz[]> => {
  const bizMap: Record<string, YelpBiz> = {};
  const results: Record<string, ReviewWithBiz> = {};
  for (const review of reviews) {
    if (!bizMap[review.bizID]) {
      const docRef = doc(firebaseDB, 'businesses', review.bizID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const biz = docSnap.data() as YelpBiz;

        bizMap[biz.id] = {
          ...biz,
        };
      }
    }
    results[review.id] = {
      ...review,
      biz: bizMap[review.bizID],
    };
  }

  return Object.values(results);
};

export const getReviewCategories = (
  reviews: ReviewWithBiz[],
): CategoryWithCount[] => {
  const categoryMap: Record<string, CategoryWithCount> = {};
  for (const review of reviews) {
    review.biz.categories.forEach((category) => {
      categoryMap[category.alias] = {
        ...category,
        count: (categoryMap[category.alias]?.count ?? 0) + 1,
      };
    });
  }
  return Object.values(categoryMap);
};
