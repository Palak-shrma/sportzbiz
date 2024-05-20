import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage

export { app, auth, db,  storage };

