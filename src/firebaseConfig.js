// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiRCYusBktuER4bJ-eUjenrzflzbtBf1w",
  authDomain: "toys-68c8e.firebaseapp.com",
  projectId: "toys-68c8e",
  storageBucket: "toys-68c8e.appspot.com",
  messagingSenderId: "80358797720",
  appId: "1:80358797720:web:6350d777d2ffbc47d1fbed",
  measurementId: "G-8E32QS4PG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);