import firebaseAdmin from 'firebase-admin'
import ApiError from "../utils/ApiError.js"
import fs from "fs";
import path from "path";

let initialised = false

try {
  // You must download this file from Firebase Console -> Project Settings -> Service Accounts
  const serviceAccountPath = path.resolve("./src/serviceAccountKey.json")
  const raw = fs.readFileSync(serviceAccountPath, "utf-8")
  const serviceAccount = JSON.parse(raw)


  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin Initialized");
  initialised = true

} catch (error) {
  throw new ApiError(
    500, error || "Firebase Admin NOT Initialised due to missing or invalid serviceAccountKey"
  )
}

export { firebaseAdmin, initialised }