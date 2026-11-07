import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB3UI8ujoUbkdcAiyubcPFJhkO7t4GlYxE',
  authDomain: 'foodbridge-37b84.firebaseapp.com',
  projectId: 'foodbridge-37b84',
  storageBucket: 'foodbridge-37b84.firebasestorage.app',
  messagingSenderId: '716492292105',
  appId: '1:716492292105:web:cd591a5b92cff4056578d8',
  measurementId: 'G-E62H12EWPM',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const analyticsPromise = typeof window !== 'undefined'
  ? isSupported().then((supported) => supported ? getAnalytics(app) : null)
  : Promise.resolve(null);
