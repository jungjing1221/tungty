// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXiFrWZ8iz6W1-6joAyyFzk3jjfLIMBa0",
  authDomain: "tungty-1bb6f.firebaseapp.com",
  projectId: "tungty-1bb6f",
  storageBucket: "tungty-1bb6f.appspot.com",
  messagingSenderId: "588362604153",
  appId: "1:588362604153:web:f6236cfdf36c2e5323bea8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);