// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9A3Bo5lv-KPAMnVQBeXhb6PgmF9lh1e8",
  authDomain: "finance-tracker-f77b0.firebaseapp.com",
  projectId: "finance-tracker-f77b0",
  storageBucket: "finance-tracker-f77b0.appspot.com",
  messagingSenderId: "500801680769",
  appId: "1:500801680769:web:300860bef53078ccc52480",
  measurementId: "G-FS80DDCJND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, db}