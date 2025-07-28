// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAfwQd3xgryydpBf2kus6KpqLV4p1m1iWM",
  authDomain: "onshur-ab377.firebaseapp.com",
  projectId: "onshur-ab377",
  storageBucket: "onshur-ab377.firebasestorage.app",
  messagingSenderId: "965873902120",
  appId: "1:965873902120:web:d5615bd4acaa5c35350b1d",
  measurementId: "G-1RM43XCQ78"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app);
// const analytics = getAnalytics(app);