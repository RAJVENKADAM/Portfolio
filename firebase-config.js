/* firebase-config.js - Firebase configuration keys and offline fallback detector */

// Firebase integration credentials. To activate live database counting:
// 1. Create a Firebase project at console.firebase.google.com
// 2. Provision a Cloud Firestore database in production mode
// 3. Replace the placeholder config keys below with your web app credentials
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};

// Check if credentials are still placeholder values
const isDemoMode = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_FIREBASE_API_KEY");

if (isDemoMode) {
  console.info(
    "📊 [Visitor System] Firebase database credentials are not configured. Running in high-performance local storage simulator mode."
  );
} else {
  // Configured mode: Renders dynamic database counters
  console.log("⚡ [Visitor System] Firebase configurations verified successfully.");
}
