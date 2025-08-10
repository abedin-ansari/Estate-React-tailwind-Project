// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5KOjgSs0Zp48tCtDrW9Wv_26BbxgWObE",
  authDomain: "estate-5065d.firebaseapp.com",
  projectId: "estate-5065d",
  storageBucket: "estate-5065d.firebasestorage.app",
  messagingSenderId: "722191734317",
  appId: "1:722191734317:web:e90bd2cd76d93c8408caa4",
  measurementId: "G-0D9RXF8E70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // <-- export auth here
