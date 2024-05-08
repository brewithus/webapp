import { firebaseDB } from '@/config/firebase';
import type firebase from 'firebase/compat/app';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export interface UserPreferences {
  id: string;
  followed?: string[]; // list of user followed biz
  saved?: string[]; // list of user saved biz
}

export interface UserPreferencesCreateUpdate {
  followed?: string[]; // list of user followed biz
  saved?: string[]; // list of user saved biz
}

// Updates or creates user preferences if they don't exist
export const updateUserPreferences = async (
  uid: string,
  dto: UserPreferencesCreateUpdate,
): Promise<UserPreferences> => {
  const docRef = doc(firebaseDB, 'userPreferences', uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, { saved: [], followed: [], ...dto });
  } else {
    await setDoc(docRef, { ...dto }, { merge: true });
  }

  return (await getDoc(docRef)).data() as UserPreferences;
};

// Fetches user preferences, creates a new one if not present
export const getUserPreferences = async (
  user: firebase.User,
): Promise<UserPreferences> => {
  const docRef = doc(firebaseDB, 'userPreferences', user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserPreferences;
  } else {
    await setDoc(docRef, { saved: [], followed: [] });
    return (await getDoc(docRef)).data() as UserPreferences;
  }
};
