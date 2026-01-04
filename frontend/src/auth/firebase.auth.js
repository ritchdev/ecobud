import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIcWdc_S80d5T7i4yl-JwtsvXzEmb9sbw",
    authDomain: "ecobud-a25ab.firebaseapp.com",
    projectId: "ecobud-a25ab",
    storageBucket: "ecobud-a25ab.firebasestorage.app",
    messagingSenderId: "203690851768",
    appId: "1:203690851768:web:60c6b53de3f89bb2e3634d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
