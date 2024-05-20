// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW1qs3fSU8d98lg4NfYzNuHvgtKC7p80I",
  authDomain: "mytestproject-f4381.firebaseapp.com",
  projectId: "mytestproject-f4381",
  storageBucket: "mytestproject-f4381.appspot.com",
  messagingSenderId: "692945201856",
  appId: "1:692945201856:web:578cb1837047fa06d89b25",
  measurementId: "G-6EC9JF2SFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = app.auth();
export const db = app.firestore();

export default app;
