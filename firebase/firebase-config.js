// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALjV4NG5KiS9jN1nRLtCXDnknbct4tSH4",
  authDomain: "tungty-602c1.firebaseapp.com",
  projectId: "tungty-602c1",
  storageBucket: "tungty-602c1.appspot.com",
  messagingSenderId: "1070589476646",
  appId: "1:1070589476646:web:5a50f0ecb43946e1960be7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);