// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3nuzd3PB88kw9o_fWl1nJXxO5opR2fpw",
  authDomain: "dyn-tickets.firebaseapp.com",
  projectId: "dyn-tickets",
  storageBucket: "dyn-tickets.appspot.com",
  messagingSenderId: "1082114404674",
  appId: "1:1082114404674:web:1ee743ef632889237258db",
  measurementId: "G-LXFDZPE1FE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);