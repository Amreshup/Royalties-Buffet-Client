// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDufaqcSItnh5deuq5Gd9itru9Hn1wq4bI",
  authDomain: "fir-foodie-client-1b08f.firebaseapp.com",
  projectId: "fir-foodie-client-1b08f",
  storageBucket: "fir-foodie-client-1b08f.appspot.com",
  messagingSenderId: "984296308918",
  appId: "1:984296308918:web:6bcb2899e6c21c76516617",
  measurementId: "G-SB1BK17F81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);;

export default app;