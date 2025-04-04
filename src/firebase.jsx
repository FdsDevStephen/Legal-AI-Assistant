import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvi6ve78duJR8G1NXkSZSqMpq7nQOA03g",
  authDomain: "ai-advisor-d4851.firebaseapp.com",
  projectId: "ai-advisor-d4851",
  storageBucket: "ai-advisor-d4851.firebasestorage.app",
  messagingSenderId: "58625373179",
  appId: "1:58625373179:web:b4124197495f29bf0d915e",
  measurementId: "G-82CMCPD4ME"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);