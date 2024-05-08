import { firebaseDB } from '@/config/firebase';
import type firebase from 'firebase/compat/app';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

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
