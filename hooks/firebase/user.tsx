import { firebaseDB } from '@/config/firebase';
import type firebase from 'firebase/compat/app';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { type BrewUser } from '@/types/brew';
import { type UseQueryResult, useQuery } from 'react-query';

export const createUser = async (user: firebase.User): Promise<void> => {
  const newUserData = {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    updated: serverTimestamp(),
    displayName: user.displayName,
  };
  try {
    const docRef = doc(firebaseDB, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, newUserData, { merge: true });
    } else {
      await setDoc(docRef, { ...newUserData, created: serverTimestamp() });
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const fetchUser = async (uid: string): Promise<BrewUser | null> => {
  try {
    const docRef = doc(firebaseDB, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result: BrewUser = docSnap.data() as BrewUser;
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};

export const useUserQuery = (uid: string): UseQueryResult<BrewUser, Error> => {
  return useQuery(
    ['user', uid],
    async () => {
      return await fetchUser(uid);
    },
    {
      enabled: !!uid, // This ensures the query runs only if uid is truthy
    },
  );
};
