// Import Firebase modules from CDN (consistent for browser usage)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ecobud-45a05.firebaseapp.com",
  projectId: "ecobud-45a05",
  storageBucket: "ecobud-45a05.firebasestorage.app",
  messagingSenderId: "904744916128",
  appId: "1:904744916128:web:869625e82acf67e35325c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get elements (with null checks to prevent errors)
const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

if (!email || !password || !msg) {
  console.error("Required HTML elements (email, password, msg) not found. Check your HTML.");
}

// Signup
document.getElementById("signupBtn")?.addEventListener("click", () => {
  if (!email.value || !password.value) {
    msg.innerText = "Please enter email and password.";
    return;
  }
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      msg.innerText = "Signup successful ✅";
    })
    .catch(err => {
      msg.innerText = `Signup failed: ${err.message}`;
    });
});

// Login
document.getElementById("loginBtn")?.addEventListener("click", () => {
  if (!email.value || !password.value) {
    msg.innerText = "Please enter email and password.";
    return;
  }
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      msg.innerText = "Login successful 🎉";
    })
    

    .catch(err => {
      msg.innerText = `Login failed: ${err.message}`;
    });
});
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      msg.innerText = "Logged out successfully 👋";
    })
    .catch((error) => {
      msg.innerText = error.message;
    });
});
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    msg.innerText = "User already logged in ✅";
  } else {
    msg.innerText = "Not logged in";
  }
});
