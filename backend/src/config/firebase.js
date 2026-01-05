import firebaseAdmin from 'firebase-admin'
import ApiError from "../utils/ApiError.js"
import fs from "fs";
import path from "path";

let initialised = false

try {
  // You must download this file from Firebase Console -> Project Settings 


  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
  })
  });
  console.log("Firebase Admin Initialized");
  initialised = true

} catch (error) {
  throw new ApiError(
    500, error || "Firebase Admin NOT Initialised due to missing or invalid serviceAccountKey"
  )
}

export { firebaseAdmin, initialised }