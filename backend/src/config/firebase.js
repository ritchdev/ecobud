const admin = require('firebase-admin');

try {
  // You must download this file from Firebase Console -> Project Settings -> Service Accounts
  const serviceAccount = require('./serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin Initialized");
  module.exports = admin;

} catch (error) {
  console.log("\n⚠️  WARNING: 'serviceAccountKey.json' not found.");
}
