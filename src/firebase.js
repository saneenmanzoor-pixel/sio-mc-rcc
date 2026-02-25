import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhQXLD14Kco9JWGW-zuP0c_iE64Ab70ac",
  authDomain: "mc-collection-calculator.firebaseapp.com",
  projectId: "mc-collection-calculator",
  storageBucket: "mc-collection-calculator.firebasestorage.app",
  messagingSenderId: "864765442921",
  appId: "1:864765442921:web:eb61fe042ceeec66e0dbf8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);