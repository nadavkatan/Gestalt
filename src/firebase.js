// Import the functions you need from the SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2qeMbm_2K7yiG80veN8vsDLqOe02GJQ4",
  authDomain: "gestalt-bfa32.firebaseapp.com",
  projectId: "gestalt-bfa32",
  storageBucket: "gestalt-bfa32.appspot.com",
  messagingSenderId: "757074792003",
  appId: "1:757074792003:web:1f8d60bb222e6652380ef6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
