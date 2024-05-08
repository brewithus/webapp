import { firebaseDB } from '@/config/firebase';
import type { BrewReview, BrewUser } from '@/types/brew';
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
