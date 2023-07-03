// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE__API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE__AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE__PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE__STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE__MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE__APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE__MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig, {
  automaticDataCollectionEnabled: true,
});
if (typeof window !== "undefined") {
  getAnalytics(app);
  getPerformance(app);
}
