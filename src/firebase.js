// Import the functions you need from the SDKs you needimport { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA48QQ1FjQK4HbbEk5tzHw6azFOYU8Rjt8",
  authDomain: "checkinface-56754.firebaseapp.com",
  databaseURL: "https://checkinface-56754-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "checkinface-56754",
  storageBucket: "checkinface-56754.appspot.com",
  messagingSenderId: "256891935466",
  appId: "1:256891935466:web:7e4f2259823fac73c21593",
  measurementId: "G-D93P55XH7D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };