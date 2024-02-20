import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

let firebaseClient;
let analytics;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASURMENT_ID}`
};

if (!firebaseClient) {
  firebaseClient = initializeApp(firebaseConfig);
  console.log('Firebase initialized.');
}

if (typeof window !== 'undefined') {
  if (!analytics) {
    analytics = getAnalytics();
    console.log('Firebase analytics initialized.');
  }
}

export { firebaseClient, analytics };

const app = initializeApp(firebaseConfig);

