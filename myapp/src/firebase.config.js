import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBmjnf_cSTHPcCqB6Y8v4hRDiQfq0CoSds",
  authDomain: "kmk-blogs.firebaseapp.com",
  projectId: "kmk-blogs",
  storageBucket: "kmk-blogs.appspot.com",
  messagingSenderId: "1066926903533",
  appId: "1:1066926903533:web:fcc2a16631f092fa6d3ce4",
  measurementId: "G-MCKQ551WRP"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app)
const analytics = getAnalytics(app);