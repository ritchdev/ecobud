const admin = require('firebase-admin');
const { default: ApiError } = require('../utils/ApiError');

let initialised = false

try {
  // You must download this file from Firebase Console -> Project Settings -> Service Accounts
  const serviceAccount = require('../serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin Initialized");
  initialised = true

} catch (error) {
  throw new ApiError(
    500, "Firebase Admin NOT Initialised due to missing or invalid serviceAccountKey"
  )
}

module.exports = { admin, initialised }