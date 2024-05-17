// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? '',
};

// Initialize firebase and google
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
  scope:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
});

export const googleSignInRedirect = (): void => {
  auth.signInWithRedirect(provider).catch((e) => {
    throw Error('Error signing in with redirect');
  });
};
export const googleSignInPopup = (): void => {
  auth.signInWithPopup(provider).catch((e) => {
    throw Error('Error signing in with popup');
  });
};
export const googleSignOut = (): void => {
  auth.signOut().catch((e) => {
    throw Error('Error signing out');
  });
};

export const firebaseDB = getFirestore(app);
