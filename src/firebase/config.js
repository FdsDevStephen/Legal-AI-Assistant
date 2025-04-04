import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD70FtHpQqVd4wV9wju5rN7vrlvX10SJAA",
    authDomain: "ai-advisor-c731a.firebaseapp.com",
    projectId: "ai-advisor-c731a",
    storageBucket: "ai-advisor-c731a.firebasestorage.app",
    messagingSenderId: "455827756218",
    appId: "1:455827756218:web:a1bcb40bbfcf3815b15e83",
    measurementId: "G-0SNVHZ2TYD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);