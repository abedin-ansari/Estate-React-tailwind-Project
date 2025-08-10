import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
